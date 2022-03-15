import React from 'react';

import './index.scss';

export default function AppContent({ ...props }) {
    return (
        <main className="app-content mdc-top-app-bar--fixed-adjust" {...props} />
    );
}