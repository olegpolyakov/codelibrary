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

export default function HomePage() {
    const [books, actions] = useStore(state => state.books.list, bookActions);

    useEffect(() => {
        actions.getBooks();
    }, [actions]);
    
    return (
        <Layout id="home-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography variant="headline6" noMargin>Недавно добавленные</Typography>
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