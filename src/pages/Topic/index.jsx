import React, { useState, useEffect, useCallback } from 'react';
import {
    Icon,
    IconButton,
    Layout,
    LayoutGrid, LayoutGridCell,
    Spinner,
    TextField,
    Typography
} from 'mdc-react';

import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/books';
import { actions as topicActions } from '@/store/topics';
import LoadingIndicator from '@/components/LoadingIndicator';
import BookCard from '@/components/BookCard';

import './index.scss';

const actionsToBind = {
    ...bookActions,
    ...topicActions
};

export default function TopicPage({ match }) {
    const [{ topic, books, user }, actions] = useStore(state => ({
        topic: state.topics.find(topic => topic.id === match.params.topicId),
        books: state.books.list,
        user: state.user
    }), actionsToBind);
    const [isSearchFieldShown, setSearchFieldShown] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        actions.unsetBooks();
        actions.getBooksByTopic(match.params.topicId);
    }, [actions, match.params.topicId]);

    const showSearchField = useCallback(() => {
        setSearchFieldShown(true);
    }, []);

    const hideSearchField = useCallback(() => {
        setQuery('');
        setSearchFieldShown(false);
    }, []);

    const handleMarkTopic = useCallback(() => {
        actions.markTopic(topic, user.uid);
    }, [actions, topic, user]);
    
    if (!topic) return <LoadingIndicator />;

    const filteredBooks = books.slice()
        .sort((a, b) => b.likedBy.length - a.likedBy.length)
        .filter(book => query === '' ? true : (
            book.slug.includes(query) ||
            book.title.toLowerCase().includes(query) ||
            book.topics.includes(query)
        ));

    return (
        <Layout id="topic-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="9">
                    <Typography className="topic-title" variant="headline4" noMargin>{topic.title}</Typography>

                    {topic.description &&
                        <Typography className="topic-description" variant="body1" noMargin>{topic.description}</Typography>
                    }
                </LayoutGridCell>

                <LayoutGridCell span="3">
                    <Layout row justifyContent="end">
                        {isSearchFieldShown ?
                            <TextField
                                value={query}
                                outlined
                                leadingIcon={<Icon>search</Icon>}
                                trailingIcon={<Icon onClick={hideSearchField}>close</Icon>}
                                onChange={setQuery}
                            />
                            :
                            <IconButton onClick={showSearchField}>
                                <Icon>search</Icon>
                            </IconButton>
                        }

                        <IconButton
                            icon={<Icon>{user && topic.markedBy.includes(user.uid) ? 'bookmark' : 'bookmark_outline'}</Icon>}
                            onClick={handleMarkTopic}
                            disabled={!user}
                        />
                    </Layout>
                </LayoutGridCell>

                {filteredBooks.map(book =>
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