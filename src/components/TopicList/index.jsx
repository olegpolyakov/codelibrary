import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List, ListItem, ListItemGraphic, ListItemText, ListItemMeta
} from 'mdc-react';

export default function TopicList({ user, topics }) {
    const markedTopics = user ? topics.filter(topic => topic.markedBy.includes(user.uid)) : null;
    const otherTopics = markedTopics ? topics.filter(t => !markedTopics.includes(t)) : topics;

    return (
        <List>
            {markedTopics && markedTopics.length > 0 && markedTopics.map(topic =>
                <ListItem
                    key={topic.id}
                    component={NavLink}
                    to={`/${topic.id}`}
                    activeClassName="mdc-list-item--activated"
                >
                    <ListItemGraphic>
                        <Avatar src={`https://storage.codedojo.ru/topics/${topic.id}.png`} />
                    </ListItemGraphic>

                    <ListItemText>
                        {topic.title}
                    </ListItemText>

                    <ListItemMeta>
                        <Icon>bookmark</Icon>
                    </ListItemMeta>
                </ListItem>
            )}
            {otherTopics.map(topic =>
                <ListItem
                    key={topic.id}
                    component={NavLink}
                    to={`/${topic.id}`}
                    activeClassName="mdc-list-item--activated"
                >
                    <ListItemGraphic>
                        <Avatar src={`https://storage.codedojo.ru/topics/${topic.id}.png`} />
                    </ListItemGraphic>

                    <ListItemText>
                        {topic.title}
                    </ListItemText>
                </ListItem>
            )}
        </List>
    );
}