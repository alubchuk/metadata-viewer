import deepFreeze from 'deep-freeze';

const testReducer = (reducer: Function, initialState: Object, action: Object, expectedState: Object, debug: boolean = false) => () => {
    deepFreeze(action);
    deepFreeze(initialState);
    const actualState = reducer(initialState, action);
    if (debug) {
        console.log('Actual State: ', actualState);
        console.log('Expected State: ', expectedState);
    }
    expect(actualState).toEqual(expectedState);
};

export default testReducer;
