import { LayoutGrid } from 'mdc-react';

import BookCard from '@/components/BookCard';

import './index.scss';

export default function BooksGrid({ books, ...props }) {
    return (
        <LayoutGrid className="books-grid">
            {books?.map(book =>
                <LayoutGrid.Cell key={book.id} desktop="2" tablet="4" phone="4" {...props}>
                    <BookCard
                        book={book}
                    />
                </LayoutGrid.Cell>
            )}
        </LayoutGrid>
    );
}