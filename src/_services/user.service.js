import config from '../../server/config';

export const userService = {
    login,
    logout,
    register,
    register_dir,
};

function login(username, password, self) {
    var self= self;
    console.log('self', self);
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
            console.log('this', history);
            console.log('user', user);
            if (user.ok) {
                self.props.history.push('/');
            }            
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return fetch(config.serverURL + '/registerUser', requestOptions).then(handleResponse);
}

function register_dir(formData) {
    console.log(config.serverURL);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
    };

    return fetch(config.serverURL + '/register_dir', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}