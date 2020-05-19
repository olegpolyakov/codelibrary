import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/books';
import BookCard from '@/components/BookCard';

import './index.scss';

export default function SearchPage({ location }) {
    const [books, actions] = useStore(state => state.books.list, bookActions);

    useEffect(() => {
        const params = location.search.slice(1).split('&').reduce((result, pair) => {
            const [key, value] = pair.split('=');
            result[key] = value;
            return result;
        }, {});
        
        actions.searchBooks(params);
    }, [actions, location.search]);
    
    return (
        <Layout id="search-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography variant="headline6" noMargin>Результаты поиска по запросу</Typography>
                </LayoutGridCell>

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