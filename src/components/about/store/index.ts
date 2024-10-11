import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
// import {selectSubreddit, fetchPosts} from './actions';
import rootReducer from './reducers';

// import {createLogger} from 'redux-logger';
// const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        // loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
);

export default store;

// store.dispatch(selectSubreddit('reactjs'));
// store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()));


// function myFunc(action: Action | ThunkAction<void, StateTree, void>,
//         dispatch: Dispatch<StateTree>) {
//     if (action instanceof ThunkAction<void, StateTree, void>) {
//         dispatch(action as ThunkAction<void, StateTree, void>);
//     } else {
//         dispatch(action as Action);
//     }
// }