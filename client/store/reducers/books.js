import api from '@/services/api';

export function getBooks(query) {
    const params = new URLSearchParams(query).toString();

    return api.get('/books' + (params && `?${params}`))
        .then(books => ({
            type: 'GET_BOOKS',
            payload: {
                books
            }
        }));
}

export function unsetBooks() {
    return {
        type: 'UNSET_BOOKS'
    };
}

export function getBook(slug) {
    return api.get(`/books/${slug}`)
        .then(book => ({
            type: 'GET_BOOK',
            payload: {
                book
            }
        }));
}

export function unsetBook() {
    return {
        type: 'UNSET_BOOK'
    };
}

export function createBook(data) {
    return api.post('/books', data)
        .then(book => ({
            type: 'CREATE_BOOK',
            payload: {
                book
            }
        }));
}

export function updateBook(bookId, data) {
    return api.put(`/books/${bookId}`, data)
        .then(book => ({
            type: 'UPDATE_BOOK',
            payload: {
                book
            }
        }));
}

export function deleteBook(bookId) {
    return api.delete(`/books/${bookId}`)
        .then(book => ({
            type: 'DELETE_BOOK',
            payload: {
                book
            }
        }));
}

export function likeBook(bookId) {
    return api.post(`/books/${bookId}/likes`)
        .then(book => ({
            type: 'LIKE_BOOK',
            payload: {
                book
            }
        }));
}

export function markBook(bookId) {
    return api.post('/user/books/marked', { bookId })
        .then(book => ({
            type: 'MARK_BOOK',
            payload: {
                book
            }
        }));
}

export function readBook(bookId) {
    return api.post('/user/books/read', { bookId })
        .then(book => ({
            type: 'READ_BOOK',
            payload: {
                book
            }
        }));
}

export const actions = {
    getBooks,
    unsetBooks,
    getBook,
    unsetBook,
    likeBook,
    markBook,
    readBook
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return {
                ...state,
                list: action.payload.books
            };

        case 'UNSET_BOOKS':
            return {
                ...state,
                list: []
            };

        case 'GET_BOOK':
            return {
                ...state,
                single: action.payload.book
            };

        case 'UNSET_BOOK':
            return {
                ...state,
                single: null
            };

        case 'LIKE_BOOK':
        case 'MARK_BOOK':
        case 'READ_BOOK':
            return {
                ...state,
                single: {
                    ...state.single,
                    ...action.payload.book
                }
            };

        default:
            return state;
    }
}