import React from 'react';
import { Spinner } from 'mdc-react';

import './index.scss';

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator">
            <Spinner />
        </div>
    );
}