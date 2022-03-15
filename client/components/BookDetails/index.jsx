import { Link } from 'react-router-dom';
import {
    Chip, ChipSet,
    List, ListItem
} from 'mdc-react';

import { formatDate } from '@/utils/date';

export default function BookDetails({ book }) {
    return (
        <section className="book-details">
            <List>
                <ListItem
                    title={book.authors.join(', ')}
                    icon="person"
                    primaryText={book.authors.join(', ')}
                />

                {book.publisher &&
                    <ListItem
                        element={Link}
                        to={`/search?publisher=${encodeURIComponent(book.publisher)}`}
                        icon="business"
                        primaryText={book.publisher}
                    />
                }

                {book.edition &&
                    <ListItem
                        icon="edit"
                        primaryText={`${book.edition}-е издание`}
                    />
                }

                {book.date &&
                    <ListItem
                        icon="event"
                        primaryText={formatDate(book.date)}
                    />
                }

                {book.pages &&
                    <ListItem
                        icon="auto_stories"
                        primaryText={`${book.pages} страниц`}
                    />
                }

                <ListItem icon="label" oneLine content={<ChipSet>
                    {book.topics.map(topic =>
                        <Chip
                            key={topic}
                            text={topic}
                        />
                    )}
                </ChipSet>}>

                </ListItem>
            </List>
        </section>
    );
}