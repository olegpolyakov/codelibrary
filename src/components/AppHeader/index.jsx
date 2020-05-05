import React, { useRef, useState, useCallback }  from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
    Avatar,
    Icon,
    IconButton,
    MenuSurface, Menu, MenuItem,
    TopAppBar
} from 'mdc-react';

import { useStore } from 'hooks/store';

import './index.scss';

export default function AppHeader({ onNavigationButtonClick, onAddButtonClick, onSignInButtonClick, onSignOutButtonClick }) {
    const menuAnchor = useRef();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const match = useRouteMatch('/:topicId');
    const [{ topics, book, user }] = useStore(state => ({
        topics: state.topics,
        book: state.books.single,
        user: state.user
    }));

    const openMenu = useCallback(({ target }) => {
        menuAnchor.current = target;
        setMenuOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);
    
    const topic = match && topics.find(topic => topic.id === match.params.topicId);
    const title = (topic && ' › ' + topic.title) || (book && ' › ' + book.title) || '';
    
    return (
        <TopAppBar
            id="app-header"
            title={`CodeLibrary${title}`}
            navigationIcon={
                <IconButton onClick={onNavigationButtonClick}>
                    <Icon>menu</Icon>
                </IconButton>
            }
            fixed
            actionItems={[
                <IconButton title="Предложить книгу" onClick={onAddButtonClick}>
                    <Icon>add</Icon>
                </IconButton>,
                (user ?
                    <Avatar src={user.photoURL} onClick={openMenu} />
                    :
                    <IconButton title="Войти" onClick={onSignInButtonClick}>
                        <Icon>person</Icon>
                    </IconButton>
                )
            ]}
        >
            <MenuSurface
                open={isMenuOpen}
                anchor={menuAnchor.current}
                onClose={closeMenu}
                top
                right
            >
                <Menu>
                    <MenuItem onClick={onSignOutButtonClick}>Выйти</MenuItem>
                </Menu>
            </MenuSurface>
        </TopAppBar>
    );
}