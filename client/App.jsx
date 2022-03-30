import { useCallback, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';

import { useBoolean } from '@/hooks/state';
import { useSelector, useActions } from '@/hooks/store';

import { getTopics } from '@/store/modules/topics';
import { createBook } from '@/store/modules/books';
import { getUser } from '@/store/modules/user';

import AppDrawer from '@/components/AppDrawer';
import AppHeader from '@/components/AppHeader';
import AppContent from '@/components/AppContent';
import BookForm from '@/components/BookForm';
import FilterList from '@/components/FilterList';
import FormDialog from '@/components/FormDialog';
import TopicList from '@/components/TopicList';

import BookPage from '@/pages/Book';
import BooksPage from '@/pages/Books';
import HomePage from '@/pages/Home';
import ListPage from '@/pages/List';
import SearchPage from '@/pages/Search';
import TopicPage from '@/pages/Topic';
import NotFound from '@/pages/NotFound';

import './App.scss';

const actionsToBind = {
    getUser,
    getTopics,
    createBook
};

export default function App() {
    const history = useHistory();

    const user = useSelector(state => state.user);
    const topics = useSelector(state => state.topics);
    const actions = useActions(actionsToBind);

    const [isDrawerOpen, toggleDrawerOpen] = useBoolean(false);
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getUser();
        actions.getTopics();
    }, [actions]);

    const handleCreateBook = useCallback(data => {
        actions.createBook(data)
            .then(() => toggleFormOpen(false));
    }, [actions]);

    const handleSearch = useCallback(query => {
        history.push(`/search?q=${query}`);
    }, [history]);

    return (
        <div className="app">
            <AppHeader
                onNavigationButtonClick={toggleDrawerOpen}
                onCreateButtonClick={toggleFormOpen}
                onSearch={handleSearch}
            />

            <AppDrawer
                open={isDrawerOpen}
                onClose={toggleDrawerOpen}
            >
                <TopicList
                    topics={topics}
                />
            </AppDrawer>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/books" component={BooksPage} />
                    <Route path="/books/:bookId" component={BookPage} />
                    <Route path="/lists/:listId" component={ListPage} />
                    <Route path="/topics/:topic" component={TopicPage} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route component={NotFound} />
                </Switch>
            </AppContent>

            <FormDialog
                title="Предложить книгу"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <BookForm
                    id="book-form"
                    user={user}
                    onSubmit={handleCreateBook}
                />
            </FormDialog>
        </div>
    );
}