import {combineReducers} from 'redux';
import {IAction} from '../../../types/store';

import {
    CHANGE_NAME
} from './actions';

function name (state:string = '', action: IAction) {
    switch (action.type) {
        case CHANGE_NAME:
            return action.name;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    name
});

export default rootReducer;