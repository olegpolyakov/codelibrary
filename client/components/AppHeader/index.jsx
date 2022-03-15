import { useCallback, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    Avatar,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import { useStore } from '@/store/hooks';
import SearchField from '@/components/SearchField';

import './index.scss';

export default function AppHeader({ onNavigationButtonClick, onCreateButtonClick }) {
    const match = useRouteMatch('/:topicId');
    const [{ topics, book, user }] = useStore(state => ({
        topics: state.topics,
        book: state.books.single,
        user: state.user
    }));

    const topic = match && topics.find(topic => topic.id === match.params.topicId);
    const title = (topic && ' › ' + topic.title) || (book && ' › ' + book.title) || '';

    return (
        <TopAppBar className="app-header" fixed>
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    <TopAppBar.NavigationIcon
                        onClick={onNavigationButtonClick}
                    >
                        <Icon>menu</Icon>
                    </TopAppBar.NavigationIcon>

                    <TopAppBar.Title><Link to="/">CodeLibrary</Link></TopAppBar.Title>
                </TopAppBar.Section>

                <TopAppBar.Section align="center">
                    <SearchField />
                </TopAppBar.Section>

                <TopAppBar.Section align="end">
                    {user &&
                        <TopAppBar.ActionItem>
                            <IconButton
                                title="Предложить книгу"
                                icon="add"
                                onClick={onCreateButtonClick}
                            />
                        </TopAppBar.ActionItem>
                    }

                    <TopAppBar.ActionItem>
                        {user ?
                            <Avatar
                                image={user.avatarUrl}
                                size="medium"
                            />
                            :
                            <IconButton
                                element="a"
                                href="/auth"
                                icon="person"
                                title="Войти"
                            />
                        }
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}