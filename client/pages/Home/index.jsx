import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import { useStore } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import BookCard from '@/components/BookCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';

import './index.scss';

export default function HomePage() {
    const [books, actions] = useStore(state => state.books.list, bookActions);

    useEffect(() => {
        if (!books) {
            actions.getBooks();
        }
    }, [books, actions]);

    if (!books) return <LoadingIndicator />;

    return (
        <Page id="home-page">
            <PageContent>
                <LayoutGrid>
                    <LayoutGridCell span="12">
                        <Typography variant="headline6" noMargin>Недавно добавленные</Typography>
                    </LayoutGridCell>

                    {books?.map(book =>
                        <LayoutGridCell key={book.id} span="2">
                            <BookCard
                                book={book}
                            />
                        </LayoutGridCell>
                    )}
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}