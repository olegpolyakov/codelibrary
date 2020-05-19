import * as db from '@/api/db';

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
        case 'MARK_BOOK':
        case 'READ_BOOK':
            return {
                ...state,
                single: action.payload.book
            };
            
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

export function likeBook(book, user) {
    const userId = user.uid;
    const data = {
        likedBy: book.likedBy ? (
            book.likedBy.includes(userId) ?
                book.likedBy.filter(id => id !== userId) :
                book.likedBy.concat(userId)
            ) : [userId]
    };

    return db.updateBook(book.id, data)
        .then(book => ({
            type: 'LIKE_BOOK',
            payload: {
                book
            }
        }));
}

export function markBook(book, user) {
    const userId = user.uid;
    const data = {
        markedBy: book.markedBy ? (
            book.markedBy.includes(userId) ?
                book.markedBy.filter(id => id !== userId) :
                book.markedBy.concat(userId)
            ) : [userId]
    };

    return db.updateBook(book.id, data)
        .then(book => ({
            type: 'MARK_BOOK',
            payload: {
                book
            }
        }));
}

export function readBook(book, user) {
    const userId = user.uid;
    const data = {
        readBy: book.readBy ? (
            book.readBy.includes(userId) ?
                book.readBy.filter(id => id !== userId) :
                book.readBy.concat(userId)
            ) : [userId]
    };

    return db.updateBook(book.id, data)
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
    searchBooks,
    getBooksByTopic,
    getBook,
    unsetBook,
    likeBook,
    markBook,
    readBook
};