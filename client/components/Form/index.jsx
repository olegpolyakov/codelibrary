import { useCallback } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function Form({ className, onSubmit, ...props }) {
    const handleSubmit = useCallback(event => {
        event.preventDefault();
        onSubmit(event);
    }, [onSubmit]);

    return (
        <form
            className={classnames('form', className)}
            onSubmit={handleSubmit}
            {...props}
        />
    );
}