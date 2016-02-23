import Store from '../src/Store';

export default class TestStore extends Store {
    constructor(transformers, initialState) {
        super(transformers, initialState);
    }

    getGreeting() {
        return this.state.ditto.greeting;
    }
}
