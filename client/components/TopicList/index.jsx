import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    List, ListItem, ListGroup
} from 'mdc-react';

import { TopicLabels } from '@/data/topics';

export default function TopicList({ user, topics }) {
    const markedTopics = user && topics.filter(topic => user.markedTopics.includes(topic.id));
    const otherTopics = markedTopics ? topics.filter(t => !markedTopics.includes(t)) : topics;

    const topicsByType = topics.reduce((result, topic) => {
        if (Array.isArray(result[topic.type])) {
            result[topic.type].push(topic);
        } else {
            result[topic.type] = [topic];
        }

        return result;
    }, {});

    console.log(topicsByType);

    return (
        <ListGroup>
            {markedTopics?.length > 0 && <>
                <ListGroup.Subheader>{TopicLabels[key]}</ListGroup.Subheader>

                <List>
                    {markedTopics?.length > 0 && markedTopics.map(topic =>
                        <ListItem
                            key={topic.id}
                            component={NavLink}
                            to={`/topics/${topic.id}`}
                            activeClassName="mdc-list-item--activated"
                            icon={
                                <Avatar image={`https://static.codedojo.ru/assets/images/topics/${topic.id}.png`} size="small" />
                            }
                            text={topic.title}
                            trailingIcon="bookmark"
                        />
                    )}
                </List>
            </>}

            {Object.entries(topicsByType).map(([key, topics]) => <>
                <ListGroup.Subheader>{TopicLabels[key]}</ListGroup.Subheader>

                <List>
                    {topics.map(topic =>
                        <ListItem
                            key={topic.id}
                            component={NavLink}
                            to={`/topics/${topic.id}`}
                            activeClassName="mdc-list-item--activated"
                            icon={
                                <Avatar image={`https://static.codedojo.ru/assets/images/topics/${topic.id}.png`} size="small" />
                            }
                            text={topic.title}
                        />
                    )}
                </List>
            </>)}
        </ListGroup>
    );
}