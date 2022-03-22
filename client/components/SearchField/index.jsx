import { useCallback, useRef, useState } from 'react';
import {
    Icon,
    TextField
} from 'mdc-react';

import './index.scss';

export default function SearchField({ onSubmit }) {
    const anchorRef = useRef();

    const [query, setQuery] = useState('');

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        onSubmit(query);
        setQuery('');
    }, [query]);

    const handleChange = useCallback((event, value) => {
        setQuery(value);
    }, []);

    const handleClear = useCallback(() => {
        setQuery('');
    }, []);

    return (
        <form className="search-field" onSubmit={handleSubmit}>
            <TextField
                ref={anchorRef}
                value={query}
                leadingIcon="search"
                trailingIcon={query &&
                    <Icon onClick={handleClear}>clear</Icon>
                }
                placeholder="Поиск"
                filled
                onChange={handleChange}
            />
        </form>
    );
}