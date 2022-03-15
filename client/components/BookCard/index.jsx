import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia } from 'mdc-react';

import './index.scss';

export default function BookCard({ book }) {
    return (
        <Card
            className="book-card"
            component={Link}
            to={`/books/${book.slug}`}
        >
            <CardMedia imageUrl={book.imageUrl} />
        </Card>
    );
}