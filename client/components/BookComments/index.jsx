import { memo } from 'react';
import { DiscussionEmbed } from 'disqus-react';

export default memo(function BookComments({ book }) {
    return (
        <DiscussionEmbed
            shortname="codelibrary-community"
            config={{
                identifier: book.id,
                url: `https://codelibrary.ru/books/${book.slug}`,
                title: book.title
            }}
        />
    );
}, (prev, next) => prev.book.id === next.book.id);