import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import auth, { signIn, signOut } from '@/api/auth';

import { useSelector, useActions } from '@/hooks/store';

import { getTopics } from '@/store/topics';
import { getLists } from '@/store/lists';
import { login, logout, getUser } from '@/store/user';

import AppDrawer from './components/AppDrawer';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import FilterList from './components/FilterList';
import TopicList from './components/TopicList';

import HomePage from './pages/Home';
import TopicPage from './pages/Topic';
import BookPage from './pages/Book';
import ListPage from './pages/List';
import FilterPage from './pages/Filter';
import SearchPage from './pages/Search';

import './App.scss';

const actionsToBind = {
    getTopics,
    getLists,
    login,
    logout,
    getUser
};

export default function App() {
    const topics = useSelector(state => state.topics);
    const user = useSelector(state => state.user);
    const actions = useActions(actionsToBind);
    const history = useHistory();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                actions.login(user);
                actions.getLists(user.uid);
            } else {
                actions.logout();
            }
        });

        actions.getTopics();
    }, [actions]);

    const handleSignOut = useCallback(() => {
        signOut();
        history.push('/');
    }, [history]);

    return (
        <div className="app">
            <AppHeader
                onNavigationButtonClick={() => setDrawerOpen(isDrawerOpen => !isDrawerOpen)}
                onSignInButtonClick={signIn}
                onSignOutButtonClick={handleSignOut}
            />

            <AppDrawer
                open={isDrawerOpen}
            >
                {user &&
                    <FilterList />
                }

                <TopicList
                    topics={topics}
                    user={user}
                />
            </AppDrawer>

            <AppContent className="mdc-top-app-bar--fixed-adjust">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/search" component={SearchPage} />
                    {user &&
                        <Route exact path="/:filter" component={FilterPage} />
                    }
                    <Route path="/topics/:topicId" component={TopicPage} />
                    <Route path="/books/:bookId" component={BookPage} />
                    <Route path="/lists/:listId" component={ListPage} />
                </Switch>
            </AppContent>
        </div>
    );
}