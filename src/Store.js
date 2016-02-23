export default class Store {
    constructor(transformers, initialState) {
      this.transformers = transformers;
      this.state = initialState;
      this.subscribers = [];
    }

    subscribe = (cb, dataToSubscribeFor) => {
        this.subscribers.push({cb, dataToSubscribeFor});
        cb(this._getDataForComponent(dataToSubscribeFor));
    };

    dispatch = (action) => {
      this.state = this._transform(this.transformers, this.state, action);
      this._notifySubscribers(this.subscribers);
    };

    _transform(transformers, oldState, action) {
      return transformers.reduce((old, t) => {
          return t(old, action);
      }, oldState);
    }

    _getDataForComponent(dataToSubscribeFor) {
        if(!dataToSubscribeFor) return this.state;

        return Object.keys(dataToSubscribeFor).reduce((acc, key) => {
            const functionName = dataToSubscribeFor[key];

            if(!this[functionName]) {
              console.warn(`[DITTO] Subscribed function '${functionName}' does not exist on store.`);
            }

            let data;
            try {
                data = this[functionName]();
            } catch(ex) {
                // Silently handle the exception where fetching deep nested values
                // and the structure doesn't exist yet.
                data = undefined;
            }

            return Object.assign({}, acc, { [key]: data });
        }, {});
    }

    _notifySubscribers(subscribers) {
        subscribers.forEach(sub => {
            const stateForSubscriber = this._getDataForComponent(sub.dataToSubscribeFor);
            sub.cb(stateForSubscriber);
        });
    }
}
