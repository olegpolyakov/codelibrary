const base = '/api';
const credentials = 'include';

const headers = {
    'CSRF-Token': window.CSRF_TOKEN,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};

function handleFetchResponse(response) {
    return response.json();
}

function handleApiResponse(response) {
    if (response.ok) {
        delete response.ok;
        return response.data;
    } else {
        throw new Error(response.error);
    }
}

export default {
    get: (url = '') => {
        return fetch(base + url, {
            method: 'GET',
            credentials,
            headers
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    post: (url, data) => {
        return fetch(base + url, {
            method: 'POST',
            credentials,
            headers,
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    put: (url, data) => {
        return fetch(base + url, {
            method: 'PUT',
            headers,
            credentials,
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    patch: (url, data) => {
        return fetch(base + url, {
            method: 'PATCH',
            headers,
            credentials,
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    delete: (url) => {
        return fetch(base + url, {
            method: 'DELETE',
            headers,
            credentials
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    }
};