import { useCallback, useState } from 'react';
import {
    FormField,
    Select,
    Switch,
    TextField
} from 'mdc-react';

import { useSelector } from '@/hooks/store';
import Form from '@/components/Form';
import publishers from '@/data/publishers';
import languages from '@/data/languages';
import levels from '@/data/levels';
import slugify from '@/utils/slugify';
import translitify from '@/utils/translitify';

import './index.scss';

const defaultBook = {
    title: '',
    slug: '',
    authors: [],
    publisher: '',
    description: '',
    contents: '',
    published: false,
    date: new Date().toISOString().slice(0, 10),
    edition: 1,
    pages: 0,
    language: '',
    level: '',
    topics: [],
    tags: [],
    pageUrl: '',
    imageFormat: 'png',
    documentFormat: 'pdf'
};

const imageFormats = [
    { id: '', label: '' },
    { id: 'png', label: 'PNG' },
    { id: 'jpg', label: 'JPG' }
];
const documentFormats = [
    { id: '', label: '' },
    { id: 'pdf', label: 'PDF' },
    { id: 'epub', label: 'EPUB' }
];

function getData(book) {
    return {
        ...book,
        authors: book.authors.join(', ')
    };
}

export default function BookForm({ user, book = defaultBook, onSubmit, ...props }) {
    const topics = useSelector(state => state.topics);

    const [data, setData] = useState(getData(book), [book.id]);

    const handleSubmit = useCallback(() => {
        onSubmit({
            ...data,
            authors: data.authors.split(',').map(part => part.trim())
        });
    }, [data, onSubmit]);

    const handleChange = useCallback((event, value) => {
        event.stopPropagation();

        setData(data => ({
            ...data,
            [event.target.name]: value
        }));
    }, []);

    const handleTitleBlur = useCallback(() => {
        setData(data => ({
            ...data,
            slug: data.slug === '' ? slugify(translitify(data.title)) : data.slug
        }));
    }, []);

    return (
        <Form className="book-form" onSubmit={handleSubmit} {...props}>
            <TextField
                name="title"
                label="Название"
                value={data.title}
                outlined
                onBlur={handleTitleBlur}
                onChange={handleChange}
            />

            <TextField
                name="slug"
                label="Слаг"
                value={data.slug}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="authors"
                label="Авторы"
                value={data.authors}
                outlined
                onChange={handleChange}
            />

            <Select
                name="publisher"
                label="Издатель"
                value={data.publisher}
                options={publishers.map(p => ({ key: p, value: p, text: p }))}
                outlined
                onChange={handleChange}
            />

            <TextField
                type="date"
                name="date"
                label="Дата выхода"
                value={data.date}
                outlined
                onChange={handleChange}
            />

            <TextField
                type="number"
                name="edition"
                label="Издание"
                value={data.edition}
                outlined
                onChange={handleChange}
            />

            <TextField
                type="number"
                name="pages"
                label="Кол-во страниц"
                value={data.pages}
                outlined
                onChange={handleChange}
            />

            <Select
                name="topics"
                label="Темы"
                value={data.topics}
                options={topics.map(({ id, title }) => ({ key: id, value: id, text: title }))}
                outlined
                onChange={handleChange}
            />

            <Select
                name="language"
                label="Язык"
                value={data.language}
                options={languages.map(({ id, label }) => ({ key: id, value: id, text: label }))}
                outlined
                onChange={handleChange}
            />

            <Select
                name="level"
                label="Уровень"
                value={data.level}
                options={levels.map(({ id, label }) => ({ key: id, value: id, text: label }))}
                outlined
                onChange={handleChange}
            />

            <TextField
                name="description"
                label="Описание"
                value={data.description}
                outlined
                textarea
                autoResize
                onChange={handleChange}
            />

            <TextField
                type="url"
                name="pageUrl"
                label="URL книги"
                value={data.pageUrl}
                outlined
                onChange={handleChange}
            />

            {user?.isAdmin &&
                <>
                    <FormField label="Опубликована" alignEnd spaceBetween>
                        <Switch
                            name="published"
                            selected={data.published}
                            onChange={handleChange}
                        />
                    </FormField>

                    <Select
                        name="documentFormat"
                        label="Формат документа"
                        value={data.documentFormat}
                        options={documentFormats.map(({ id, label }) => ({ key: id, value: id, text: label }))}
                        outlined
                        onChange={handleChange}
                    />

                    <Select
                        name="imageFormat"
                        label="Формат изображения"
                        value={data.imageFormat}
                        options={imageFormats.map(({ id, label }) => ({ key: id, value: id, text: label }))}
                        outlined
                        onChange={handleChange}
                    />
                </>
            }
        </Form>
    );
}