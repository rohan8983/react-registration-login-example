import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    register_dir,
    getAll,
    deleteDir,
    updateDir,
};

//user authentication
function login(username, password, cb) {
    return dispatch => {
        dispatch(request({ username, password }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    cb(user);
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
}//login end

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}//logout end

//function for registering users
function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
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
}//register end

//register funtion for registering users info
function register_dir(formData, _id, cd) {
    return dispatch => {
        dispatch(request(formData));

        userService.register_dir(formData, _id)
            .then((newData) => {
                dispatch(success(formData));
                dispatch(alertActions.success('Registration Directory Successfull'));
                cd(newData);
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
}//register_dir end

//function for getting all user data
function getAll(user, cb) {
    return dispatch => {
        dispatch(request());

        userService.getAll(user)
            .then((data) => {
                dispatch(success(data));
                cb(data);
            },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: userConstants.REGISTER_DIR_REQUEST } }
    function success(data) { return { type: userConstants.REGISTER_DIR_SUCCESS, data } }
    function failure(error) { return { type: userConstants.REGISTER_DIR_FAILURE, error } }
}//getAll end

//delete function for deleting user directory
function deleteDir(obj, cd) {
    return dispatch => {
        dispatch(request());
        userService.deleteDir(obj)
            .then((data) => {
                dispatch(success(data));
                dispatch(alertActions.success('Directory Removed'));
                cd(data);
            },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
    function request() { return { type: userConstants.DELETE_DIR_REQUEST } }
    function success(data) { return { type: userConstants.DELETE_DIR_SUCCESS, data } }
    function failure(error) { return { type: userConstants.DELETE_DIR_FAILURE, error } }
};//deleteDir end

function updateDir(value, userId, cd) {
    return dispatch => {
        dispatch(request());
        userService.updateDir(value, userId)
            .then((data) => {
                dispatch(success(data));
                dispatch(alertActions.success('Update Successfully'));
                cd(data);
            },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
    function request() { return { type: userConstants.DELETE_DIR_REQUEST } }
    function success(data) { return { type: userConstants.DELETE_DIR_SUCCESS, data } }
    function failure(error) { return { type: userConstants.DELETE_DIR_FAILURE, error } }
}

