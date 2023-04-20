export async function fetchLogin(username) {
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
                return response.json().then((err) => Promise.reject(err));
            }
            return response.json();
        });
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

export async function fetchAllPosts() {
    return fetch('/api/post/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .catch((err) => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }

            return response.json();
        });
}

export async function fetchUserPosts(username) {
    return fetch(`/api/post/${username}`, {
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

export async function fetchDeleteUserPost(postId) {
    return fetch(`/api/post/${postId}`, {
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

export async function fetchComments(postId) {
    return fetch(`/api/post/${postId}/comment`, {
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

export async function fetchCreateComment(postId, content) {
    return fetch(`/api/post/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
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
