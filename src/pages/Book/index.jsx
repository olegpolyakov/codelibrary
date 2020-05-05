import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Badge,
    Icon,
    IconButton,
    Layout,
    LayoutGrid, LayoutGridCell,
    List, ListItem, ListItemGraphic, ListItemText,
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from 'hooks/store';
import { actions as bookActions } from 'store/books';

import BookComments from 'components/BookComments';

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

    function handleBookmarkButtonClick() {
        if (user) {
            actions.bookmarkBook(book, user);
        }
    }

    function handleLikeButtonClick() {
        if (user) {
            actions.likeBook(book, user);
        }
    }
    
    if (!book) return <Spinner />;
    
    return (
        <Layout id="book-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Layout row justifyContent="between">
                        <Typography variant="headline4" noMargin>{book.title}</Typography>

                        <Layout>
                            <IconButton
                                on={false}
                                icon={<Icon>bookmark</Icon>}
                                onClick={handleBookmarkButtonClick}
                                disabled={!user}
                            />

                            <Badge value={book.likes.length} overlap>
                                <IconButton
                                    on={false}
                                    icon={<Icon>thumb_up</Icon>}
                                    onClick={handleLikeButtonClick}
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
                    <img src={book.imageUrl} alt="" />

                    <List twoLine>
                        <ListItem title={book.authors.join(', ')}>
                            <ListItemGraphic>
                                <Icon>person</Icon>
                            </ListItemGraphic>

                            <ListItemText
                                primary={book.authors.join(', ')}
                                secondary={book.authors.length === 1 ? 'Автор' : 'Авторы'}
                            />
                        </ListItem>

                        {book.publisher &&
                            <ListItem
                                element={Link}
                                to={`/search?publisher=${encodeURIComponent(book.publisher)}`}
                            >
                                <ListItemGraphic>
                                    <Icon>business</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={book.publisher}
                                    secondary="Издатель"
                                />
                            </ListItem>
                        }

                        {book.edition &&
                            <ListItem>
                                <ListItemGraphic>
                                    <Icon>mode_edit</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={`${book.edition}-е издание`}
                                    secondary="Издание"
                                />
                            </ListItem>
                        }

                        {book.year &&
                            <ListItem>
                                <ListItemGraphic>
                                    <Icon>event</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={book.year}
                                    secondary="Год"
                                />
                            </ListItem>
                        }

                        {book.pages &&
                            <ListItem>
                                <ListItemGraphic>
                                    <Icon>book</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={`${book.pages} страниц`}
                                    secondary="Кол-во страниц"
                                />
                            </ListItem>
                        }

                        {book.original &&
                            <ListItem
                                element={Link}
                                to={`/books/${book.original.slug}`}
                            >
                                <ListItemGraphic>
                                    <Icon>link</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={book.original.title}
                                    secondary="Оригинал"
                                />
                            </ListItem>
                        }
                    </List>
                </LayoutGridCell>

                <LayoutGridCell span="10">
                    <Typography>{book.description}</Typography>

                    <BookComments book={book} />
                </LayoutGridCell>
            </LayoutGrid>
        </Layout>
    );
}