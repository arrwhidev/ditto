import React from 'react';
import TodosContainer from './TodosContainer'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <header className="header">
        				    <h1>todos</h1>
      		      </header>
                <TodosContainer />
            </div>
        );
    }
}
