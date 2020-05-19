import React from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    List, ListItem, ListItemText, ListItemMeta
} from 'mdc-react';

export default function BookDetailsList({ book }) {
    return (
        <List twoLine>
            <ListItem title={book.authors.join(', ')}>
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
                    <ListItemText
                        primary={book.publisher}
                        secondary="Издатель"
                    />
                </ListItem>
            }

            {book.edition &&
                <ListItem>
                    <ListItemText
                        primary={`${book.edition}-е издание`}
                        secondary="Издание"
                    />
                </ListItem>
            }

            {book.year &&
                <ListItem>
                    <ListItemText
                        primary={book.year}
                        secondary="Год"
                    />
                </ListItem>
            }

            {book.pages &&
                <ListItem>
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
                    <ListItemText
                        primary={book.original.title}
                        secondary="Оригинал"
                    />

                    <ListItemMeta>
                        <Icon>link</Icon>
                    </ListItemMeta>
                </ListItem>
            }
        </List>
    );
}