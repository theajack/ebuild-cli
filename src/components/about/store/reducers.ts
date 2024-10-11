import {combineReducers} from 'redux';
import {IAction} from '../../../types/store';
import {
    CHANGE_NAME
} from './actions';


function changeName (state:string = '', action: IAction) {
    switch (action.type) {
        case CHANGE_NAME:
            return action.name;
        // case RECEIVE_POSTS:
        // case REQUEST_POSTS:
        //     return Object.assign({}, state, {
        //         [action.subreddit]: posts(state[action.subreddit], action)
        //     });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    changeName,
    // selectedsubreddit
});

export default rootReducer;