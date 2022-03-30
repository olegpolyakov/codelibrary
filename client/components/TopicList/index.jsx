import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function TopicList({ topics }) {
    const markedTopics = topics.filter(topic => topic.marked);
    const otherTopics = markedTopics ? topics.filter(t => !markedTopics.includes(t)) : topics;
    const topicsByType = topics.reduce((result, topic) => {
        if (Array.isArray(result[topic.type])) {
            result[topic.type].push(topic);
        } else {
            result[topic.type] = [topic];
        }

        return result;
    }, {});

    return (
        <List.Group>
            <List>
                {topics.map(topic =>
                    <List.Item
                        key={topic.id}
                        component={NavLink}
                        to={`/topics/${topic.id}`}
                        activeClassName="mdc-list-item--activated"
                        avatar={
                            <Avatar key={topic.id} image={topic.imageUrl} size="medium" />
                        }
                        text={topic.title}
                    />
                )}
            </List>
        </List.Group>
    );
}