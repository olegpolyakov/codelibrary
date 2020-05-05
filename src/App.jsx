import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import auth, { signIn, signOut } from 'api/auth';

import { useActions } from 'hooks/store';

import { getTopics } from 'store/topics';
import { createBook } from 'store/books';
import { getLists } from 'store/lists';
import { login, logout} from 'store/user';

import AppDrawer from './components/AppDrawer';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import FormDialog from './components/FormDialog';
import BookForm from './components/BookForm';
import HomePage from './pages/Home';
import TopicPage from './pages/Topic';
import BookPage from './pages/Book';
import ListPage from './pages/List';
import SearchPage from './pages/Search';

import './App.scss';

const actionsToBind = {
    getTopics,
    createBook,
    getLists,
    login,
    logout
};

export default function App() {
    const actions = useActions(actionsToBind);
    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                actions.login(user)
                actions.getLists(user.uid);
            } else {
                actions.logout();
            }
        });

        actions.getTopics();
    }, [actions]);

    function handleSubmit(data) {
        actions.createBook(data).then(() => setDialogOpen(false));
    }

    return (
        <div className="app">
            <AppHeader
                onNavigationButtonClick={() => setDrawerOpen(isDrawerOpen => !isDrawerOpen)}
                onAddButtonClick={() => setDialogOpen(true)}
                onSignInButtonClick={signIn}
                onSignOutButtonClick={signOut}
            />

            <AppDrawer
                open={isDrawerOpen}
            />

            <AppContent className="mdc-top-app-bar--fixed-adjust">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/:topicId" component={TopicPage} />
                    <Route path="/books/:bookId" component={BookPage} />
                    <Route path="/lists/:listId" component={ListPage} />
                </Switch>
            </AppContent>

            <FormDialog
                form="book-form"
                title="Новая книга"
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <BookForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </div>
    );
}