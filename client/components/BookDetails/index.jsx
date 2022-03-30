import { Link } from 'react-router-dom';
import { List } from 'mdc-react';

import { formatDate } from '@/utils/date';

import './index.scss';

export default function BookDetails({ book }) {
    return (
        <section className="book-details">
            <List>
                <List.Item
                    icon="person"
                    content={book.authors.map(author =>
                        <Link key={author} to={`/books?authors=${encodeURIComponent(author)}`} title={author}>{author}</Link>
                    )}
                    oneLine
                />

                {book.publisher &&
                    <List.Item
                        icon="business"
                        content={<Link to={`/books?publisher=${encodeURIComponent(book.publisher)}`}>{book.publisher}</Link>}
                        oneLine
                    />
                }

                {book.edition &&
                    <List.Item
                        icon="edit"
                        primaryText={`${book.edition}-е издание`}
                    />
                }

                {book.date &&
                    <List.Item
                        icon="event"
                        primaryText={formatDate(book.date)}
                    />
                }

                {book.pages &&
                    <List.Item
                        icon="auto_stories"
                        primaryText={`${book.pages} страниц`}
                    />
                }
            </List>
        </section>
    );
}