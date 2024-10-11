import {Dispatch} from 'react';
import {Action} from 'redux';

const fetch = (url: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(url);
            resolve('success');
        }, 1000);
    });
};

export const CHANGE_NAME = 'CHANGE_NAME';

export const changeName = (name: any) => ({
    type: CHANGE_NAME,
    name
});

export const changeNameAsync = (name?: string) => async (dispatch: Dispatch<Action>, getState: Function) => {
    dispatch(changeName('loading' + name));
    console.log(name, getState());
    const res = await fetch('/api') as string;
    dispatch(changeName(res + name));
    console.log(name, getState());
};

// import {ThunkAction} from 'redux-thunk';
// import {Action} from 'redux';
// : ThunkAction<void, {}, null, Action<string>>


// store/user/thunk.ts

// import {ThunkAction} from 'redux-thunk';
// import {Action} from 'redux';

// function loginApi () {
//     return fetch('')
//         .then(res => (res as Json).json());
// }
  
// export const thunkLogin = (): ThunkAction<void, {}, null, Action<string>> => async dispatch => {
//     const asyncResp = await loginApi();
//     dispatch(
//         updateUser({
//             loggedIn: asyncResp.isloggedIn,
//             userName: '',
//             userPwd: ''
//         })
//     );
// };