import React from 'react';
import Footer from './Footer';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);

const TodoApp = () => (
    <Provider store={store}>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </Provider>
);

export default TodoApp;