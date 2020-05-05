import { firestore } from 'firebase';

const db = firestore();

const operatorForField = {
    authors: 'array-contains',
    publisher: '==',
    topics: 'array-contains',
    subtopics: 'array-contains',
};

export function getTopics() {
    return db.collection('topics')
        .get()
        .then(mapSnapshot);        
}

export function getBooks() {
    return db.collection('books')
        .limit(12)
        .get()
        .then(mapSnapshot);        
}

export function searchBooks(params = {}) {
    const query = Object.entries(params).reduce((query, [field, value]) => {
        return query.where(field, operatorForField[field], decodeURIComponent(value));
    }, db.collection('books'));

    return query
        .get()
        .then(mapSnapshot);        
}

export function getBooksByTopic(topic) {
    return db.collection('books')
        .where('topics', 'array-contains', topic)
        .get()
        .then(mapSnapshot);        
}

export function getBook(slug) {
    return db.collection('books')
        .where('slug', '==', slug)
        .get()
        .then(mapSnapshot)
        .then(([book]) => {
            if (book.original) {
                return book.original.get()
                    .then(original => original.data())
                    .then(original => {
                        book.original = original;
                        return book;
                    });
            } else {
                return book;
            }
        });
}

export function createBook(data) {
    return db.collection('books')
        .add(data)
        .then(docRef => docRef.get())
        .then(mapDoc);
}

export function updateBook(bookId, data) {
    return db.collection('books')
        .doc(bookId)
        .update(data)
        .then(() => data);
}

export function getLists(userId) {
    return db.collection('lists')
        .where('userId', '==', userId)
        .get()
        .then(mapSnapshot);        
}

export function getList(listId) {
    return db.collection('lists').doc(listId)
        .get()
        .then(mapDoc)
        .then(list => {
            
            return Promise.all(list.books.map(mapRef))
                .then(books => {
                    list.books = books;
                    return list;
                });
        });
}

export function createList(data) {
    return db.collection('lists')
        .add(data)
        .then(docRef => docRef.get())
        .then(mapDoc);
}

function mapSnapshot(snapshot) {
    return snapshot.docs.map(mapDoc);
}

function mapRef(ref) {
    return ref.get().then(mapDoc);
}

function mapDoc(doc) {
    return {
        id: doc.id,
        ...doc.data()
    };
}