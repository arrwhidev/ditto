import { expect } from 'chai';
import Wrapper from '../src/Wrapper'

describe('Wrapper', () => {
    describe('#mapActionsToDispatch()', () => {
        const dispatch = (action) => {
            // 
        }
        const actions = {
            incrementCount: () => { return { type: 'INC_COUNTER' }; },
            decrementCount: () => { return { type: 'DEC_COUNTER' }; }
        };
        const wrapper = new Wrapper();
        const result = wrapper.mapActionsToDispatch(actions, dispatch);

        it('should contain action keys with functions that dispatch the action, when actions are objects', () => {
            expect(result).to.have.property('incrementCount');
            expect(result).to.have.property('decrementCount');
            expect(result.incrementCount).to.be.instanceof(Function);
            expect(result.decrementCount).to.be.instanceof(Function);
        });
    });
});
