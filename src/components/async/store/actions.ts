import {Dispatch} from 'react';
import {Action} from 'redux';

// 模拟网络请求
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