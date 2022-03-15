import { useCallback, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    ListGroup
} from 'mdc-react';

import { useSelector, useActions } from '@/store/hooks';
import { getTopics } from '@/store/reducers/topics';
import { createBook } from '@/store/reducers/books';
import { getUser } from '@/store/reducers/user';

import AppDrawer from '@/components/AppDrawer';
import AppHeader from '@/components/AppHeader';
import AppContent from '@/components/AppContent';
import FilterList from '@/components/FilterList';
import TopicList from '@/components/TopicList';
import FormDialog from '@/components/FormDialog';
import BookForm from '@/components/BookForm';

import HomePage from '@/pages/Home';
import TopicPage from '@/pages/Topic';
import BookPage from '@/pages/Book';
import ListPage from '@/pages/List';
import FilterPage from '@/pages/Filter';
import SearchPage from '@/pages/Search';

import './App.scss';

const actionsToBind = {
    getUser,
    getTopics,
    createBook
};

export default function App() {
    const user = useSelector(state => state.user);
    const topics = useSelector(state => state.topics);
    const actions = useActions(actionsToBind);

    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);

    useEffect(() => {
        actions.getUser();
        actions.getTopics();
    }, [actions]);

    const handleCreateBook = useCallback(data => {
        actions.createBook(data)
            .then(() => setFormOpen(false));
    }, []);

    const toggleDrawer = useCallback(() => {
        setDrawerOpen(isOpen => !isOpen);
    }, []);

    const toggleForm = useCallback(() => {
        setFormOpen(isOpen => !isOpen);
    }, []);

    return (
        <div className="app">
            <AppHeader
                onNavigationButtonClick={toggleDrawer}
                onCreateButtonClick={toggleForm}
            />

            <AppDrawer
                open={isDrawerOpen}
            >
                <TopicList
                    user={user}
                    topics={topics}
                />
            </AppDrawer>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/search" component={SearchPage} />
                    {user &&
                        <Route exact path="/:filter" component={FilterPage} />
                    }
                    <Route path="/topics/:topic" component={TopicPage} />
                    <Route path="/books/:bookId" component={BookPage} />
                    <Route path="/lists/:listId" component={ListPage} />
                </Switch>
            </AppContent>

            <FormDialog
                title="Предложить книгу"
                open={isFormOpen}
                onClose={toggleForm}
            >
                <BookForm
                    id="book-form"
                    onSubmit={handleCreateBook}
                />
            </FormDialog>
        </div>
    );
}