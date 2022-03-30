import { useEffect } from 'react';

import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/modules/books';
import BooksGrid from '@/components/BooksGrid';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';
import PageSection from '@/components/PageSection';

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
                <PageSection title="Недавно добавленные">
                    <BooksGrid
                        books={books}
                    />
                </PageSection>
            </PageContent>
        </Page>
    );
}