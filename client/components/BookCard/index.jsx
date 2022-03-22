import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'mdc-react';

import './index.scss';

export default function BookCard({ book }) {
    return (
        <Card
            className="book-card"
            component={Link}
            to={`/books/${book.slug}`}
            title={book.title}
        >
            <Card.Media
                imageUrl={book.imageUrl}
            />
        </Card>
    );
}