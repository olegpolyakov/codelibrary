import { useEffect } from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import { useSelector, useActions } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import Page from '@/components/page';
import LoadingIndicator from '@/components/LoadingIndicator';
import BookCard from '@/components/BookCard';

import './index.scss';

export default function BooksPage({ location }) {
    const user = useSelector(state => state.user);
    const books = useSelector(state => state.books.list);
    const actions = useActions(bookActions);

    useEffect(() => {
        actions.getBooks(location.search);
    }, [actions, location.search]);

    if (!user) return <LoadingIndicator />;

    return (
        <Page id="books-page">
            <LayoutGrid>
                {books.map(book =>
                    <LayoutGrid.Cell key={book.id} span="2">
                        <BookCard
                            book={book}
                        />
                    </LayoutGrid.Cell>
                )}
            </LayoutGrid>
        </Page>
    );
}