import React from 'react';
import classnames from 'classnames';

export default (props) => (
  <footer className="footer">
      <span className="todo-count"><strong>{props.todos.filter(item => !item.completed).length}</strong> items left</span>
      <ul className="filters">
          { button(props, 'SHOW_ALL', 'all') }
          { button(props, 'SHOW_ACTIVE', 'active') }
          { button(props, 'SHOW_COMPLETED', 'completed') }
      </ul>
      {props.todos.filter(item => item.completed).length > 0 ?
      <button
          className="clear-completed"
          onClick={props.clearCompleteTodos}>
          Clear completed
      </button>
          : null
      }
  </footer>
);

const button = (props, status, text) => {
  const clazz = classnames({
    'selected': props.filter === status
  });

  return (
    <li>
        <a className={clazz} onClick={props.toggleFilter.bind(this, status)}>{text}</a>
    </li>
  );
}
