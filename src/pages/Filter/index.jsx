import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell,
    Spinner,
    Typography
} from 'mdc-react';

import { useSelector, useActions } from '@/hooks/store';
import { actions as bookActions } from '@/store/books';
import BookCard from '@/components/BookCard';

import './index.scss';

const titleForFilter = {
    favorite: 'Понравившиеся',
    marked: 'Отложенные',
    read: 'Прочитанные'
};

export default function FilterPage({ match }) {
    const filter = match.params.filter;
    const user = useSelector(state => state.user);
    const books = useSelector(state => state.books.list);
    const actions = useActions(bookActions);

    useEffect(() => {
        actions.getBooksByFilter(filter, user.uid);
    }, [actions, filter, user]);

    if (!user) return <Spinner />;

    return (
        <Layout id="topic-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography className="topic-title" variant="headline4" noMargin>{titleForFilter[filter]}</Typography>
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