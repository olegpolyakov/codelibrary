import React, { useEffect } from 'react';
import {
    Layout,
    LayoutGrid, LayoutGridCell,
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from '@/hooks/store';
import { actions as listActions } from '@/store/lists';
import BookCard from '@/components/BookCard';

import './index.scss';

export default function ListPage({ match }) {
    const [list, actions] = useStore(state => state.lists.single, listActions);

    useEffect(() => {
        actions.getList(match.params.listId);
    }, [actions, match.params.listId]);
    
    if (!list) return <Spinner />;
    
    return (
        <Layout id="topic-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography className="topic-title" variant="headline4" noMargin>{list.title}</Typography>
                </LayoutGridCell>

                {list.books.map(book =>
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