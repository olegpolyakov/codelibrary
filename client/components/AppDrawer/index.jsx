import React from 'react';
import { Drawer } from 'mdc-react';

import { useScreenSize } from '@/hooks/screen';

import './index.scss';

export default function AppDrawer({ open, children, onClose }) {
    const screenSize = useScreenSize();

    return (
        <Drawer
            className="app-drawer"
            open={open}
            dismissible={screenSize === undefined || screenSize === 'desktop'}
            modal={screenSize === 'phone' || screenSize === 'tablet'}
            onClose={onClose}
        >
            <Drawer.Content>
                {children}
            </Drawer.Content>
        </Drawer>
    );
}