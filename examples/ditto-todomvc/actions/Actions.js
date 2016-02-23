import * as types from './ActionTypes.js';

export function addTodo(text) {
    return { type: types.ADD_TODO, text };
}

export function toggleTodo(id) {
    return { type: types.TOGGLE_TODO, id };
}

export function toggleFilter(filter) {
    return { type: types.TOGGLE_FILTER, filter };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}

export function clearCompleteTodos() {
    return { type: types.CLEAR_COMPLETE_TODO };
}
