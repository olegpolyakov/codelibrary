import { useEffect, useState } from 'react';
import {
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useStore } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import Page from '@/components/Page';
import LoadingIndicator from '@/components/LoadingIndicator';
import BookCard from '@/components/BookCard';

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
            <LayoutGrid>
                {query &&
                    <LayoutGrid.Cell span="12">
                        <Typography type="headline6" noMargin>Результаты поиска по запросу "{query}"</Typography>
                    </LayoutGrid.Cell>
                }

                {books?.map(book =>
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