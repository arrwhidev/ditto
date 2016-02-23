import { expect } from 'chai';
import Store from '../src/Store';
import TestStore from './TestStore';

const incCounterTransformer = (state, action) => {
    return Object.assign({}, state, { count: state.count+1 });
};

describe('Store', () => {
    describe('#constructor()', () => {
        const initialState = { count: 50 };
        const transformers = [incCounterTransformer];
        const store = new Store(transformers, initialState);

        it('should save the initial state and transformers', () => {
            expect(store.state.count).to.equal(50);
            expect(store.transformers.length).to.equal(1);
        });
    });

    describe('#subscribe() - for all data', () => {
        const initialState = { count: 50 };
        const transformers = [incCounterTransformer];
        const store = new Store(transformers, initialState);

        let first = true;
        const cb = (state) => {
            if(first) {
                first = false;
                it('should callback with the initial state', () => {
                    expect(state.count).to.equal(50);
                });
            } else {
                it('should callback with the transformed state', () => {
                    expect(state.count).to.equal(51);
                });
            }
        };

        store.subscribe(cb);

        it('should add to the subscribers array', () => {
            expect(store.subscribers.length).to.equal(1);
        });

        describe('#dispatch()', () => {
            store.dispatch({});
            // See 'cb' above for assertion.
        });
    });

    describe('#subscribe() - for invalid data', () => {
        const initialState = { count: 50 };
        const store = new Store([], initialState);
        const cb = (state) => {
            it('should return correct key but undefined value', () => {
                expect('ditto' in state).to.equal(true);
                expect(state.ditto).to.equal(undefined);
            });
        };

        store.subscribe(cb, { ditto: 'getDitto '});
    });

    describe('#subscribe() - for valid data', () => {
        const initialState = {
            ditto: {
                greeting: 'hello from ditto'
            }
        };
        const store = new TestStore([], initialState);
        const cb = (state) => {
            it('should return correct key with correct value', () => {
                expect(state.hello).to.equal('hello from ditto');
            });
        };

        store.subscribe(cb, { hello: 'getGreeting' });
    });

    describe('#_transform()', () => {
        const transformers = [incCounterTransformer, incCounterTransformer, incCounterTransformer];
        const store = new Store();
        const transformed = store._transform(transformers, { count: 0 });

        it('should increment counter 3 times', () => {
            expect(transformed.count).to.equal(3);
        });
    });

    describe('#_transform()', () => {
        const firstTransformer = (state, action) => {
            expect(state.count).to.equal(0);
            return Object.assign({}, state, { count: state.count+1 });
        };
        const secondTransformer = (state, action) => {
            expect(state.count).to.equal(1);
            return Object.assign({}, state, { count: state.count+1 });
        };
        const thirdTransformer = (state, action) => {
            expect(state.count).to.equal(2);
            return Object.assign({}, state, { count: state.count+1 });
        };

        const transformers = [firstTransformer, secondTransformer, thirdTransformer];
        const store = new Store();

        it('should call the transformers in order', () => {
             store._transform(transformers, { count: 0 });
        });
    });
});
