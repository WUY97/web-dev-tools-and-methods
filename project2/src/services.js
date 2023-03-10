export function fetchLogin(username) {
    return fetch('/api/session/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({ username }),
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

export function checkLoginStatus() {
    return fetch('/api/session/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export function fetchLogout() {
    return fetch('/api/session/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export function updateChat() {
    return fetch('/api/chat/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export function addMessage(word) {
    return fetch('/api/word/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ word, receiver }),
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export function getOnlineUsers() {
    return fetch('/api/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}
