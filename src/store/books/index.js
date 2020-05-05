import * as db from 'api/db';

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
            }

        case 'GET_BOOK':
            return {
                ...state,
                single: action.payload.book
            }

        case 'UNSET_BOOK':
            return {
                ...state,
                single: null
            }

        case 'LIKE_BOOK':
            return {
                ...state,
                single: action.payload.book
            };
        
        case 'CREATE_BOOK':
        default:
            return state;
    }
}

export function getBooks() {
    return db.getBooks()
        .then(books => ({
            type: 'GET_BOOKS',
            payload: {
                books
            }
        }));
}

export function searchBooks(params) {
    return db.searchBooks(params)
        .then(books => ({
            type: 'GET_BOOKS',
            payload: {
                books
            }
        }));
}

export function getBooksByTopic(topic) {
    return db.getBooksByTopic(topic)
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
    return db.getBook(slug)
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
    return db.createBook(data)
        .then(book => ({
            type: 'CREATE_BOOK',
            payload: {
                book
            }
        }));
}

export function likeBook(book, user) {
    const userId = user.uid;
    const data = {
        ...book,
        likes:book.likes.includes(userId) ?
            book.likes.filter(id => id !== userId) :
            book.likes.concat(userId)
    };

    return db.updateBook(book.id, data)
        .then(book => ({
            type: 'LIKE_BOOK',
            payload: {
                book
            }
        }));
}

export function bookmarkBook(book, user) {
    const userId = user.uid;
    const data = {
        ...book,
        bookmarks:book.likes.includes(userId) ?
            book.likes.filter(id => id !== userId) :
            book.likes.concat(userId)
    };

    return db.updateBook(book.id, data)
        .then(book => ({
            type: 'LIKE_BOOK',
            payload: {
                book
            }
        }));
}

export const actions = {
    getBooks,
    unsetBooks,
    searchBooks,
    getBooksByTopic,
    createBook,
    getBook,
    unsetBook,
    likeBook
};