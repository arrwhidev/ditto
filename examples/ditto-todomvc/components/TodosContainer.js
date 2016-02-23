import React from 'react';
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import { subscribeToStore } from '../../../dist/Ditto.js';

@subscribeToStore({
  todos: 'getTodos',
  filter: 'getFilter'
})
export default class TodosContainer extends React.Component {
    state = {
        todos: [],
        inputText: ''
    };

    storeUpdated = (state) => {
        this.setState(state);
    };

    render() {
        return (
            <section className="main">
              <input className="new-todo"
                     placeholder="What needs to be done?"
                     autofocus
                     value={this.state.inputText}
                     onChange={this.handleChange}
                     onKeyDown={this.handleSubmit} />
              <TodoList {...this.state} toggleTodo={this.toggleTodo} deleteTodo={this.deleteTodo} />
              <TodoFilter toggleFilter={this.toggleFilter} filter={this.state.filter} clearCompleteTodos={this.clearCompleteTodos} todos={this.state.todos} />
            </section>
        );
    }

    handleChange = (e) => {
        this.setState({ inputText: e.target.value });
    };

    handleSubmit = (e) => {
        if (e.which === 13) {
            this.context.actions.addTodo(e.target.value);
            this.setState({ inputText: '' });
        }
    };

    toggleTodo = (item) => {
        this.context.actions.toggleTodo(item.id);
    };

    toggleFilter = (filter) => {
        this.context.actions.toggleFilter(filter);
    };

    deleteTodo = (item) => {
        this.context.actions.deleteTodo(item.id);
    };

    clearCompleteTodos = () => {
        this.context.actions.clearCompleteTodos();
    };
}
