import { useCallback, useEffect, useState } from 'react';
import { IconButton } from 'mdc-react';

import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/modules/books';
import { actions as topicActions } from '@/store/modules/topics';
import BooksGrid from '@/components/BooksGrid';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';

import './index.scss';

const actionsToBind = {
    ...bookActions,
    ...topicActions
};

export default function TopicPage({ match }) {
    const [{ topic, books, user }, actions] = useStore(state => ({
        user: state.user,
        topic: state.topics.find(topic => topic.id === match.params.topic),
        books: state.books.list
    }), actionsToBind);

    const [query, setQuery] = useState('');
    const [isSearchFieldShown, setSearchFieldShown] = useState(false);

    useEffect(() => {
        actions.unsetBooks();
        actions.getBooks({ topics: match.params.topic });
    }, [match.params.topic]);

    const handleMarkTopic = useCallback(() => {
        actions.markTopic(topic);
    }, [topic, user]);

    if (!topic || !books) return <LoadingIndicator />;

    // const filteredBooks = books.slice()
    //     .sort((a, b) => b.likedBy.length - a.likedBy.length)
    //     .filter(book => query === '' ? true : (
    //         book.slug.includes(query) ||
    //         book.title.toLowerCase().includes(query) ||
    //         book.topics.includes(query)
    //     ));

    return (
        <Page id="topic-page">
            <PageHeader
                title={topic.title}
                description={topic.description}
                actions={<>
                    {/* <IconButton
                        icon={user?.markedTopics.includes(topic.id) ? 'bookmark' : 'bookmark_outline'}
                        title={user?.markedTopics.includes(topic.id) ? 'Отметить тему' : 'Отменить отметку'}
                        onClick={handleMarkTopic}
                        disabled={!user}
                    />

                    <IconButton
                        icon="tune"
                        title="Фильтры и сортировка"
                        onClick={handleMarkTopic}
                    /> */}
                </>}
            />

            <PageContent>
                <BooksGrid
                    books={books}
                />
            </PageContent>
        </Page>
    );
}