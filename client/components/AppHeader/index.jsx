import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Menu,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import { useBoolean } from '@/hooks/state';
import { useStore } from '@/hooks/store';
import SearchField from '@/components/SearchField';

import './index.scss';

export default function AppHeader({ onNavigationButtonClick, onCreateButtonClick, onSearch }) {
    const [user] = useStore(state => state.user);

    const [isMenuOpen, toggleMenuOpen] = useBoolean(false);

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
                    <SearchField
                        onSubmit={onSearch}
                    />
                </TopAppBar.Section>

                <TopAppBar.Section align="end">
                    <TopAppBar.ActionItem>
                        <IconButton
                            element="a"
                            href="https://github.com/olegpolyakov/codelibrary/issues/new"
                            target="_blank"
                            title="Сообщить о проблеме"
                            icon="bug_report"
                        />
                    </TopAppBar.ActionItem>

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
                            <Menu
                                anchor={
                                    <Avatar
                                        key="avatar"
                                        image={user.avatarUrl}
                                        size="medium"
                                        onClick={toggleMenuOpen}
                                    />
                                }
                                anchorOrigin={Menu.Origin.TOP_RIGHT}
                                transformOrigin={Menu.Origin.TOP_RIGHT}
                                open={isMenuOpen}
                                onClose={toggleMenuOpen}
                            >
                                <Menu.Item
                                    element="a"
                                    href="/auth/logout"
                                    text="Выйти"
                                />
                            </Menu>
                            :
                            <Button
                                element="a"
                                href="/auth"
                                label="Войти"
                            />
                        }
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}