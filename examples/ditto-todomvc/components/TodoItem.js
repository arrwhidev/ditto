import React from 'react';
import classnames from 'classnames';

export default class TodoItem extends React.Component {
    render() {
        let attrs = {};
        if(this.props.item.completed) {
            attrs['checked'] = true;
        }

        const clazz = classnames({
            completed: this.props.item.completed
        });

        return (
          <li className={clazz}>
              <div className="view">
                 <input className="toggle" type="checkbox"
                        onClick={this.props.toggleTodo.bind(this, this.props.item)}
                        {...this.props.attrs} />
                 <label>{this.props.item.text}</label>
                 <button className="destroy" onClick={this.props.deleteTodo.bind(this, this.props.item)}></button>
              </div>
          </li>
        );
    }
}
