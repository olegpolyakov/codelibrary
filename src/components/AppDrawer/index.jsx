import React from 'react';
import {
    Drawer, DrawerContent
} from 'mdc-react';

import './index.scss';

export default function AppDrawer({ open, children }) {
    return (
        <Drawer
            id="app-drawer"
            dismissible
            open={open}
        >
            <DrawerContent>
                {children}
            </DrawerContent>
        </Drawer>
    );
}