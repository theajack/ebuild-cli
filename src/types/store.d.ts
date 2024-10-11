import {Action, AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';

export interface IAction extends Action {
    [prop: string]: any;
}

declare module 'redux' {
    // interface Dispatch extends ThunkDispatch {

    // }
    interface Dispatch<S, E, A extends Action = AnyAction> {
        <T extends A>(action: T): T;
        <R>(asyncAction: ThunkAction<R, S, E, A>): R;
    }
}