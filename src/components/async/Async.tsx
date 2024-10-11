import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import Temp from './Temp';

declare global{
    interface Window {
        astore: any;
    }
}

window.astore = store;

const AsyncApp = () => {
    return (
        <Provider store={store}>
            <Temp />
        </Provider>
    );
};

export default AsyncApp;
