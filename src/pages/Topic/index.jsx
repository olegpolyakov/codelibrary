import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell,
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from 'hooks/store';
import { actions as bookActions } from 'store/books';
import BookCard from 'components/BookCard';

import './index.scss';

export default function TopicPage({ match }) {
    const [state, actions] = useStore(state => ({
        books: state.books.list,
        topics: state.topics
    }), bookActions);

    useEffect(() => {
        actions.unsetBooks();
        actions.getBooksByTopic(match.params.topicId);
    }, [actions, match.params.topicId]);
    
    const topic = state.topics.find(topic => topic.id === match.params.topicId);
    const books = state.books.slice().sort((a, b) => b.likes.length - a.likes.length);
    
    if (!topic) return <Spinner />;

    return (
        <Layout id="topic-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography className="topic-title" variant="headline4" noMargin>{topic.title}</Typography>

                    {topic.description &&
                        <Typography className="topic-description" variant="body1" noMargin>{topic.description}</Typography>
                    }
                </LayoutGridCell>

                {books.map(book =>
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