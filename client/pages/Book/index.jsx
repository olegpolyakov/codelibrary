import { useCallback, useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    IconButton,
    Layout,
    LayoutGrid,
    Typography
} from 'mdc-react';

import md from '@/utils/md';
import { useStore } from '@/store/hooks';
import { actions as bookActions } from '@/store/reducers/books';

import Page from '@/components/page';
import LoadingIndicator from '@/components/LoadingIndicator';
import FormDialog from '@/components/FormDialog';
import BookDetails from '@/components/BookDetails';
import BookComments from '@/components/BookComments';
import BookForm from '@/components/BookForm';

import './index.scss';

export default function BookPage({ match }) {
    const [{ book, user }, actions] = useStore(state => ({
        user: state.user,
        book: state.books.single
    }), bookActions);

    const [isFormOpen, setFormOpen] = useState(false);

    useEffect(() => {
        actions.getBook(match.params.bookId);

        return () => actions.unsetBook();
    }, [actions, match.params.bookId]);

    const handleSubmit = useCallback(data => {
        actions.updateBook(book.id, data);
    }, [actions, book]);

    const handleLikeButtonClick = useCallback(() => {
        actions.likeBook(book.id);
    }, [actions, book]);

    const handleBookmarkButtonClick = useCallback(() => {
        actions.markBook(book.id);
    }, [actions, book]);

    const handleReadButtonClick = useCallback(() => {
        actions.readBook(book.id);
    }, [actions, book]);

    const toggleForm = useCallback(() => {
        setFormOpen(v => !v);
    }, []);

    if (!book) return <LoadingIndicator />;

    return (
        <Page id="book-page">
            <LayoutGrid>
                <LayoutGrid.Cell span="12">
                    <Layout row justifyContent="between">
                        <Typography className="book-title" type="headline4" noMargin>{book.title}</Typography>

                        <Layout row alignItems="center">
                            {user?.isAdmin &&
                                <IconButton
                                    icon="edit"
                                    title="Редактировать книгу"
                                    onClick={toggleForm}
                                />
                            }

                            <Badge value={book.likes} inset>
                                <IconButton
                                    icon={user && book.likedBy?.includes(user.id) ? 'thumb_up_alt' : 'thumb_up_off_alt'}
                                    title={user && book.likedBy?.includes(user.id) ? 'Убрать отметку' : 'Отметить книгу как понравившуюся'}
                                    onClick={handleLikeButtonClick}
                                    disabled={!user}
                                />
                            </Badge>

                            <IconButton
                                icon={user?.markedBooks.includes(book.id) ? 'bookmark' : 'bookmark_outline'}
                                title={user?.markedBooks.includes(book.id) ? 'Отложена' : 'Отложить'}
                                disabled={!user}
                                onClick={handleBookmarkButtonClick}
                            />

                            <IconButton
                                icon={user?.readBooks.includes(book.id) ? 'check_box' : 'check_box_outline_blank'}
                                title={user?.readBooks.includes(book.id) ? 'Прочитана' : 'Не прочитана'}
                                disabled={!user}
                                onClick={handleReadButtonClick}
                            />
                        </Layout>
                    </Layout>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3" grid>
                    <LayoutGrid.Cell span="12">
                        <Card>
                            <img className="book-cover" src={book.imageUrl} alt="" />
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="12">
                        <Card>
                            <Card.Header title="Детали" />

                            <Card.Section>
                                <BookDetails book={book} />
                            </Card.Section>

                            <Card.Actions>
                                {book.pageUrl &&
                                    <Button
                                        element="a"
                                        href={book.pageUrl}
                                        target="_blank"
                                        label="Подробнее"
                                        icon="exit_to_app"
                                        outlined
                                    />
                                }
                            </Card.Actions>
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="9" grid>
                    <LayoutGrid.Cell span="12">
                        <Card>
                            <Card.Header title="Описание" />

                            <Card.Section secondary>
                                <section className="book-description" dangerouslySetInnerHTML={{ __html: md.render(book.description) }} />
                            </Card.Section>
                        </Card>

                        {book.contents &&
                            <>
                                <Typography type="headline6" noMargin>Содержание</Typography>

                                <section className="book-contents" dangerouslySetInnerHTML={{ __html: md.render(book.contents) }} />
                            </>
                        }
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="12">
                        <Card>
                            <Card.Header title="Комментарии" />

                            <Card.Section secondary>
                                <BookComments book={book} />
                            </Card.Section>
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid.Cell>
            </LayoutGrid>

            <FormDialog
                title="Редактирование книги"
                persistent
                open={isFormOpen}
                onClose={toggleForm}
            >
                <BookForm
                    id="book-form"
                    user={user}
                    book={book}
                    onSubmit={handleSubmit}
                    onClose={toggleForm}
                />
            </FormDialog>
        </Page>
    );
}