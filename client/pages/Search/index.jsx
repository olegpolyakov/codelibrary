import { useEffect } from 'react';
import {
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useStore } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import Page from '@/components/Page';
import BookCard from '@/components/BookCard';

import './index.scss';

export default function SearchPage({ location }) {
    const [books, actions] = useStore(state => state.books.list, bookActions);

    useEffect(() => {
        const params = location.search.slice(1).split('&').reduce((result, pair) => {
            const [key, value] = pair.split('=');
            result[key] = decodeURIComponent(value);
            return result;
        }, {});

        actions.getBooks(params);
    }, [actions, location.search]);

    return (
        <Page id="search-page">
            <LayoutGrid>
                <LayoutGrid.Cell span="12">
                    <Typography type="headline6" noMargin>Результаты поиска по запросу</Typography>
                </LayoutGrid.Cell>

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