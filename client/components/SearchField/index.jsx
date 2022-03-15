import { useCallback, useMemo, useRef, useState } from 'react';
import {
    CircularProgress,
    Icon,
    TextField
} from 'mdc-react';

import throttle from '@/utils/throttle';

import './index.scss';

export default function SearchField() {
    const anchorRef = useRef();

    const [query, setQuery] = useState('');
    const [isLoading, setLoading] = useState(false);

    const getResults = useMemo(() => throttle(query => {
        setLoading(true);
        fetch(`/admin/api/users?search=${query}`)
            .then(res => res.json())
            .then(res => {
                setResults(res.data);
                setMenuOpen(true);
                setLoading(false);
                anchorRef.current.control.focus();
            });
    }, 1000), []);

    const handleChange = useCallback((event, value) => {
        getResults(value);
    }, []);

    const handleInput = useCallback(event => {
        setQuery(event.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setQuery('');
        setMenuOpen(false);
    }, []);

    return (
        <TextField
            className="search-field"
            ref={anchorRef}
            element="form"
            value={query}
            leadingIcon="search"
            trailingIcon={isLoading ?
                <span><CircularProgress size="small" indeterminate /></span>
                :
                (query && <Icon onClick={handleClear}>clear</Icon>)
            }
            placeholder="Поиск"
            filled
            onInput={handleInput}
            onChange={handleChange}
        />
    );
}