import React from 'react';

export default class Wrapper extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      store: this.props.store,
      actions: this.mapActionsToDispatch(this.props.actions, this.props.store.dispatch)
    }
  }

  mapActionsToDispatch(actions, dispatch) {
      return Object.keys(actions).reduce((acc, actionName) => {
          const action = actions[actionName];
          const thisGetsExecutedByComponent = (...args) => {
              const actionContents = action(...args);

              if(typeof actionContents === 'function') {
                  actionContents(dispatch);
              } else if(typeof actionContents === 'object') {
                 dispatch(actionContents);
              } else {
                console.error('[DITTO] Actions must return a function or object.');
              }
          };

          return Object.assign({}, acc, { [actionName]: thisGetsExecutedByComponent });

      }, {});
  }

  render() {
      return this.props.children;
  }
}
