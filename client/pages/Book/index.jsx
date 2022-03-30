import { useCallback, useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    IconButton,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useBoolean } from '@/hooks/state';
import { useStore } from '@/hooks/store';
import { actions as bookActions } from '@/store/modules/books';
import BookComments from '@/components/BookComments';
import BookDetails from '@/components/BookDetails';
import BookForm from '@/components/BookForm';
import FormDialog from '@/components/FormDialog';
import LoadingIndicator from '@/components/LoadingIndicator';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import md from '@/utils/md';

import './index.scss';

export default function BookPage({ history, match }) {
    const [{ book, user }, actions] = useStore(state => ({
        user: state.user,
        book: state.books.single
    }), bookActions);

    const [clicks, setClicks] = useState(0);
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getBook(match.params.bookId);

        return () => actions.unsetBook();
    }, [actions, match.params.bookId]);

    const handleUpdate = useCallback(data => {
        actions.updateBook(book.id, data)
            .then(() => toggleFormOpen(false));
    }, [actions, book]);

    const handleDelete = useCallback(() => {
        if (confirm('Вы уверены что хотите удалить книгу?')) {
            actions.deleteBook(book.id)
                .then(() => history.push('/'));
        }
    }, [actions, book]);

    const handleLikeButtonClick = useCallback(() => {
        if (book.liked) {
            actions.unlikeBook(book.id);
        } else {
            actions.likeBook(book.id);
        }
    }, [actions, book, user]);

    const handleBookmarkButtonClick = useCallback(() => {
        if (book.marked) {
            actions.unmarkBook(book.id);
        } else {
            actions.markBook(book.id);
        }
    }, [actions, book]);

    const handleReadButtonClick = useCallback(() => {
        if (book.read) {
            actions.unreadBook(book.id);
        } else {
            actions.readBook(book.id);
        }
    }, [actions, book]);

    if (!book) return <LoadingIndicator />;

    return (
        <Page id="book-page">
            <PageHeader
                title={book.title}
                actions={<>
                    {book.documentUrl &&
                        <IconButton
                            element={user ? 'a' : 'button'}
                            target={user ? '_blank' : undefined}
                            href={user ? book.documentUrl : undefined}
                            icon="local_library"
                            title="Читать книгу"
                            disabled={!user}
                        />
                    }

                    <Badge value={book.likes} inset>
                        <IconButton
                            icon={book.liked ? 'thumb_up_alt' : 'thumb_up_off_alt'}
                            title={book.liked ? 'Убрать отметку' : 'Отметить книгу как понравившуюся'}
                            disabled={!user}
                            onClick={handleLikeButtonClick}
                        />
                    </Badge>

                    <IconButton
                        icon={book.marked ? 'bookmark' : 'bookmark_outline'}
                        title={book.marked ? 'Отложена' : 'Отложить'}
                        disabled={!user}
                        onClick={handleBookmarkButtonClick}
                    />

                    <IconButton
                        icon={book.read ? 'check_box' : 'check_box_outline_blank'}
                        title={book.read ? 'Прочитана' : 'Не прочитана'}
                        disabled={!user}
                        onClick={handleReadButtonClick}
                    />

                    {user?.isAdmin &&
                        <>
                            <IconButton
                                icon="edit"
                                title="Редактировать книгу"
                                onClick={toggleFormOpen}
                            />

                            <IconButton
                                icon="delete"
                                title="Удалить книгу"
                                onClick={handleDelete}
                            />
                        </>
                    }
                </>}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell desktop="3" tablet="4" phone="4" grid>
                        <LayoutGrid.Cell span="12">
                            <Card>
                                <Card.Media>
                                    <img className="book-cover" src={book.imageUrl} alt={`Обложка ${book.title}`} />
                                </Card.Media>

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

                    <LayoutGrid.Cell desktop="9" tablet="4" phone="4" grid>
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
            </PageContent>

            <FormDialog
                title="Редактирование книги"
                persistent
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <BookForm
                    id="book-form"
                    user={user}
                    book={book}
                    onSubmit={handleUpdate}
                    onClose={toggleFormOpen}
                />
            </FormDialog>
        </Page>
    );
}