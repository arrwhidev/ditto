import * as types from '../actions/ActionTypes.js';

export default function transform(state, action) {
  switch (action.type) {
    case types.ADD_TODO:
        return handleAddTodo(state, action);
    case types.TOGGLE_TODO:
        return handleToggleTodo(state, action);
      case types.TOGGLE_FILTER:
          return handleToggleFilter(state, action);
      case types.DELETE_TODO:
          return handleDeleteTodo(state, action);
      case types.CLEAR_COMPLETE_TODO:
          return handleClearCompleteTodo(state, action);
    default:
        return state;
  }
}

function handleDeleteTodo(state, action) {
  const newTodos = state.todos.filter(item => item.id !== action.id);
  return Object.assign({}, state, { todos: newTodos });
}

function handleAddTodo(state, action) {
  const newTodos = [...state.todos,
    { id: state.nextTodoId,
      text: action.text,
      completed: false
  }];
  return Object.assign({}, state, { todos: newTodos, nextTodoId: state.nextTodoId+1 });
}

function handleToggleTodo(state, action) {
  const newTodos = state.todos.map(item => {
      if(item.id !== action.id) return item;
      return Object.assign({}, item, { completed: !item.completed });
  });

  return Object.assign({}, state, { todos: newTodos });
}

function handleToggleFilter(state, action) {
    return Object.assign({}, state, { filter: action.filter });
}

function handleClearCompleteTodo(state) {
    const newTodos = state.todos.filter(item => !item.completed);
    return Object.assign({}, state, { todos: newTodos });
}
