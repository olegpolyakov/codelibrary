import { useEffect, useState } from 'react';

import { useSelector, useActions } from '@/hooks/store';
import { actions as bookActions } from '@/store/modules/books';
import BooksGrid from '@/components/BooksGrid';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';

import './index.scss';

const prefixFor = {
    publisher: 'Книги издательства ',
    authors: 'Книги автора '
};

export default function BooksPage({ location }) {
    const books = useSelector(state => state.books.list);
    const actions = useActions(bookActions);

    const [title, setTitle] = useState();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const param = Array.from(params)[0];

        if (param) {
            const [key, value] = param;
            const prefix = prefixFor[key];
            setTitle(prefix + value);
        }

        actions.getBooks(location.search);
    }, [actions, location.search]);

    if (!books) return <LoadingIndicator />;

    return (
        <Page id="books-page">
            {title &&
                <PageHeader
                    title={title}
                />
            }

            <PageContent>
                <BooksGrid
                    books={books}
                />
            </PageContent>
        </Page>
    );
}