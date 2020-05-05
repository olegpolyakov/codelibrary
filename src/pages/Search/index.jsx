import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell
} from 'mdc-react';

import { useStore } from 'hooks/store';
import { searchBooks } from 'store/books';
import BookCard from 'components/BookCard';

import './index.scss';

export default function SearchPage({ location }) {
    const [state, actions] = useStore(state => state, { searchBooks });

    useEffect(() => {
        const params = location.search.slice(1).split('&').reduce((result, pair) => {
            const [key, value] = pair.split('=');
            result[key] = value;
            return result;
        }, {});

        actions.searchBooks(params).then(console.log);
    }, [actions, location.search]);

    const books = state.books;
    
    return (
        <Layout id="search-page" className="page">
            <LayoutGrid>
                {books.map(book =>
                    <LayoutGridCell key={book.id} span="2">
                        <BookCard
                            book={book}
                        />
                    </LayoutGridCell>
                )}
            </LayoutGrid>
        </Layout>
    );
}