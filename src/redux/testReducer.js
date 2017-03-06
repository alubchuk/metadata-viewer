import deepFreeze from 'deep-freeze';

const testReducer = (reducer, initialState, action, expectedState, debug = false) => () => {
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
