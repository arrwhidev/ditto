import { Store } from 'dittojs';
import transformers from '../transformers';

const initialState = {
  todos: [],
  nextTodoId: 0,
  filter: 'SHOW_ALL'
};

export default class MyStore extends Store {
    constructor() {
      super(transformers, initialState);
    }

    getTodos() {
      return this.state.todos;
    }

    getFilter() {
      return this.state.filter;
    }
}
