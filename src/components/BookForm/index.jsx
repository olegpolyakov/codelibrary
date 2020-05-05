import React, { useState } from 'react';
import {
    Layout,
    TextField,
    Select, SelectOption
} from 'mdc-react';

import { useSelector } from 'hooks/store';

const publishers = [
    'Apress',
    'No Starch Press',
    'Manning',
    'MIT Press',
    'Microsoft Press',
    'O\'Reilly',
    'Wrox',
    'ДМК Пресс'
];

export default function BookForm({ onSubmit }) {
    const topics = useSelector(state => state.topics);
    const [data, setData] = useState({
        title: '',
        slug: '',
        authors: '',
        publisher: '',
        language: 'en',
        topics: '',
        subtopics: '',
        year: 2020,
        edition: 1,
        pages: 0,
        url: '',
        imageUrl: '',
        description: ''
    });

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            ...data,
            year: Number(data.year),
            edition: Number(data.edition),
            pages: Number(data.pages),
            authors: data.authors.split(',').map(s => s.trim()),
            topics: data.topics.split(',').map(s => s.trim()),
            subtopics: data.subtopics.split(',').map(s => s.trim()),
            likes: []
        });
    }

    function handleChange(value, { name }) {
        setData(data => ({ ...data, [name]: value }));
    }

    return (
        <form id="book-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="title"
                    value={data.title}
                    label="Название"
                    outlined
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="slug"
                    value={data.slug}
                    label="Слаг"
                    outlined
                    required
                    onChange={handleChange}
                />

                <TextField
                    name="authors"
                    value={data.authors}
                    label="Авторы"
                    outlined
                    required
                    onChange={handleChange}
                    helperText="Вводите авторов через запятую"
                />

                <Select
                    value={data.publisher}
                    name="publisher"
                    label="Издатель"
                    outlined
                    onChange={handleChange}
                >
                    {publishers.map(publisher =>
                        <SelectOption
                            key={publisher}
                            value={publisher}
                        >
                            {publisher}
                        </SelectOption>    
                    )}
                </Select>

                <TextField
                    name="topics"
                    value={data.topics}
                    label="Темы"
                    outlined
                    required
                    onChange={handleChange}
                    helperText="Вводите авторов через запятую"
                />

                <TextField
                    name="subtopics"
                    value={data.subtopics}
                    label="Подтемы"
                    outlined
                    onChange={handleChange}
                    helperText="Вводите авторов через запятую"
                />

                {/* <Select
                    value={data.topic}
                    name="topic"
                    label="Тема"
                    outlined
                    onChange={handleChange}
                >
                    {topics.map(topic =>
                        <SelectOption
                            key={topic.id}
                            value={topic.id}
                        >
                            {topic.title}
                        </SelectOption>    
                    )}
                </Select> */}

                <TextField
                    type="number"
                    name="year"
                    value={data.year}
                    label="Год"
                    outlined
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="edition"
                    value={data.edition}
                    label="Издание"
                    outlined
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="pages"
                    value={data.pages}
                    label="Кол-во страниц"
                    outlined
                    onChange={handleChange}
                />

                <TextField
                    type="url"
                    name="url"
                    value={data.url}
                    label="URL"
                    outlined
                    onChange={handleChange}
                />

                <TextField
                    type="url"
                    name="imageUrl"
                    value={data.imageUrl}
                    label="URL изображения"
                    outlined
                    onChange={handleChange}
                />

                <TextField
                    name="description"
                    value={data.description}
                    label="Описание"
                    textarea
                    onChange={handleChange}
                />
            </Layout>
        </form>
    );
}