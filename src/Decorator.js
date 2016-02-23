 import React from 'react';

export default function subscribeToStore(dataToSubscribeFor) {
  return function(Component){
      const {prototype} = Component;
      Component.contextTypes = {
        store: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
      };

      const functionsToOverride = [{
          componentDidMount() {
              this.context.store.subscribe(this.storeUpdated, dataToSubscribeFor);
          }
      }];

      functionsToOverride.forEach(behavior => {
          Object.keys(behavior).forEach(key => {
              const mixinKey = `__mixin_${key}`
              prototype[mixinKey] = prototype[mixinKey] || [prototype[key]]
              prototype[mixinKey] = prototype[mixinKey]
                .concat(behavior[key])
                .filter(fn => typeof fn == "function");

              prototype[key] = function() {
                  for (let fn of prototype[mixinKey]) {
                      fn.apply(this, arguments);
                  }
              }
          });
        });
    }
}
