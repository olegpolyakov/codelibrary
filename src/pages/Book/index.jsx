import React, { useEffect, useCallback } from 'react';
import {
    Badge,
    Icon,
    IconButton,
    Layout,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import md from '@/utils/md';
import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/books';
import LoadingIndicator from '@/components/LoadingIndicator';
import BookDetailsList from '@/components/BookDetailsList';
import BookComments from '@/components/BookComments';

import './index.scss';

export default function BookPage({ match }) {
    const [{ book, user }, actions] = useStore(state => ({
        user: state.user,
        book: state.books.single
    }), bookActions);

    useEffect(() => {
        actions.getBook(match.params.bookId);

        return () => actions.unsetBook();
    }, [actions, match.params.bookId]);

    const handleLikeButtonClick = useCallback(() => {
        if (user) {
            actions.likeBook(book, user);
        }
    }, [actions, user, book]);

    const handleBookmarkButtonClick = useCallback(() => {
        if (user) {
            actions.markBook(book, user);
        }
    }, [actions, user, book]);

    const handleReadButtonClick = useCallback(() => {
        if (user) {
            actions.readBook(book, user);
        }
    }, [actions, user, book]);
    
    if (!book) return <LoadingIndicator />;
    
    return (
        <Layout id="book-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Layout row justifyContent="between">
                        <Typography className="book-title" variant="headline4" noMargin>{book.title}</Typography>

                        <Layout>
                            <Badge
                                value={book.likedBy.length}
                                overlap
                            >
                                <IconButton
                                    icon={<Icon>{user && book.likedBy?.includes(user.uid) ? 'favorite' : 'favorite_border'}</Icon>}
                                    title={user && book.likedBy?.includes(user.uid) ? 'Убрать отметку' : 'Отметить книгу как понравившуюся'}
                                    onClick={handleLikeButtonClick}
                                    disabled={!user}
                                />
                            </Badge>

                            <Badge
                                value={book.markedBy.length}
                                overlap
                            >
                                <IconButton
                                    icon={<Icon>{user && book.markedBy?.includes(user.uid) ? 'bookmark' : 'bookmark_outline'}</Icon>}
                                    title={user && book.markedBy?.includes(user.uid) ? 'Убрать отметку' : 'Отложить книгу'}
                                    disabled={!user}
                                    onClick={handleBookmarkButtonClick}
                                />
                            </Badge>

                            <Badge
                                value={book.readBy && book.readBy.length}
                                overlap
                            >
                                <IconButton
                                    icon={<Icon>{user && book.readBy?.includes(user.uid) ? 'check_box' : 'check_box_outline_blank'}</Icon>}
                                    title={user && book.readBy?.includes(user.uid) ? 'Убрать отметку' : 'Отметить книгу как прочитанную'}
                                    onClick={handleReadButtonClick}
                                    disabled={!user}
                                />
                            </Badge>

                            {book.url &&
                                <IconButton
                                    element="a"
                                    href={book.url}
                                    target="_blank"
                                    title="Перейти на страницу книги"
                                    icon={<Icon>exit_to_app</Icon>}
                                />
                            }
                        </Layout>
                    </Layout>
                </LayoutGridCell>

                <LayoutGridCell span="2">
                    <img className="book-cover" src={book.imageUrl} alt="" />

                    <BookDetailsList book={book} />
                </LayoutGridCell>

                <LayoutGridCell span="10">
                    <div className="book-description mdc-typography" dangerouslySetInnerHTML={{ __html: md.render(book.description) }} />

                    <BookComments book={book} />
                </LayoutGridCell>
            </LayoutGrid>
        </Layout>
    );
}