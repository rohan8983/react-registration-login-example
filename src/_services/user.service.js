import config from '../../server/config';

export const userService = {
    login,
    logout,
    register,
    register_dir,
    getAll,
    deleteDir,
    updateDir,
    search,
};

//login function 
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.serverURL + '/login', requestOptions)
        .then(response => {
            return response.json();
        })
        .then(user => {
            return user;
        });
}

//logout function
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//function register 
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return fetch(config.serverURL + '/registerUser', requestOptions).then(handleResponse);
}

//function for registering users data
function register_dir(formData, _id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: _id,
            formData,
        })
    };

    return fetch(config.serverURL + '/register_dir', requestOptions).then(handleResponse);
}

function getAll(user) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ _id: user.result._id }),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(config.serverURL + '/getAll', requestOptions).then(handleResponse);
}//end of getAll

//delete function for delete users directory
function deleteDir(obj) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ obj }),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(config.serverURL + '/delete', requestOptions).then(handleResponse);
}//end of deleteDir

//update function for edit users previous data 
function updateDir(data, userId) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ data, userId: userId }),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(config.serverURL + '/update', requestOptions).then(handleResponse);
}

//function for searching directories
function search(formData, id) {
    console.log("service", formData);
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ userId: id, formData }),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(config.serverURL + '/search', requestOptions).then(handleResponse);
}//end of search

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}