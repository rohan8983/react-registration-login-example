import {userConstants} from '../_constants/user.constants';

export function registerDirectory(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_DIR_REQUEST:
            return {};
        case userConstants.REGISTER_DIR_SUCCESS:
            return {};
        case userConstants.REGISTER_DIR_FAILURE:
            return {};
        default:
            return state;
    }
}