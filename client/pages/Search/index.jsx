import { useEffect, useState } from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/modules/books';
import BookCard from '@/components/BookCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';

import './index.scss';

export default function SearchPage({ location }) {
    const [books, actions] = useStore(state => state.books.list, bookActions);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!location.search) return;

        setLoading(true);

        actions.unsetBooks();
        actions.searchBooks(location.search)
            .then(() => setLoading(false));

        return () => actions.unsetBooks();
    }, [actions, location.search]);

    const query = location.search.slice(3);

    if (isLoading) return <LoadingIndicator />;

    return (
        <Page id="search-page">
            {query &&
                <PageHeader
                    title={`Результаты поиска по запросу "${query}"`}
                />
            }

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