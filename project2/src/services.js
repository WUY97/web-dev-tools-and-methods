export function fetchLogin(username) {
    return fetch('/api/v1/session/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
}

export function checkLoginStatus() {
    return fetch('/api/v1/session/', {
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
    return fetch('/api/v1/session/', {
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

export function updateChat(username2) {
    return fetch(`/api/v1/chat?username2=${username2}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .catch((err) => Promise.reject({ error: err }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export function addMessage(text, receiver) {
    return fetch('/api/v1/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text, receiver }),
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
    return fetch('/api/v1/user/', {
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
