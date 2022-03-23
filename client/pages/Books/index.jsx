import { useEffect } from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import { useSelector, useActions } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import BookCard from '@/components/BookCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';

import './index.scss';

export default function BooksPage({ location }) {
    const books = useSelector(state => state.books.list);
    const actions = useActions(bookActions);

    useEffect(() => {
        actions.getBooks(location.search);
    }, [actions, location.search]);

    if (!books) return <LoadingIndicator />;

    return (
        <Page id="books-page">
            <PageContent>
                <LayoutGrid>
                    {books?.map(book =>
                        <LayoutGrid.Cell key={book.id} span="2">
                            <BookCard
                                book={book}
                            />
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}