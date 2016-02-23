import React from 'react';
import TodoItem from './TodoItem';

export default (props) => (
  <ul className="todo-list">
      { filterTodos(props.todos, props.filter)
          .map((todo, i) => <TodoItem item={todo} key={i} {...props} />) }
  </ul>
);

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
        return todos;
  }
}
