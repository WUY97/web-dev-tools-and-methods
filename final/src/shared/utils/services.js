export async function fetchLogin(username) {
    return (
        fetch('/api/session/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json', // set this header when sending JSON in the body of request
            },
            body: JSON.stringify({ username }),
        })
            .catch((err) => Promise.reject({ error: 'network-error' }))
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => Promise.reject(err));
                }
                return response.json();
            })
    );
}

export async function checkLoginStatus() {
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

export async function fetchLogout() {
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

export async function fetchCreatePost(formData) {
    return fetch('/api/post/', {
        method: 'POST',
        body: formData,
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