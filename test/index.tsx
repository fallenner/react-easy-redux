import React from 'react';
import { Provider, getStore, connect } from '../src';

const store = getStore([]);

const TestComponent = () => null;

const ConnectTest = connect(TestComponent, null);

const Test = () => {
    return (
        <Provider store={store}>
            <ConnectTest />
        </Provider>
    );
};

export default Test;
