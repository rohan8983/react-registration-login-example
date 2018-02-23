import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    register_dir,
};

function login(username, password, self) {
    console.log('self in actions', self);
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password, self)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration Successfull'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

//register funtion for registering users info
function register_dir(formData) {
    return dispatch => {
        dispatch(request(formData));

        userService.register_dir(formData)
            .then(() => {
                dispatch(success(formData));
                dispatch(alertActions.success('Registration Directory Successfull'));
            },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(formData) { return { type: userConstants.REGISTER_DIR_REQUEST, formData } }
    function success(formData) { return { type: userConstants.REGISTER_DIR_SUCCESS, formData } }
    function failure(error) { return { type: userConstants.REGISTER_DIR_FAILURE, error } }
}

