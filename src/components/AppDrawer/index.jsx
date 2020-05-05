import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    Drawer, DrawerContent,
    Icon,
    List, ListItem, ListItemGraphic, ListItemText,
    ListDivider,
    ListGroup
} from 'mdc-react';

import { useSelector } from 'hooks/store';

import './index.scss';

export default function AppDrawer({ open }) {
    const topics = useSelector(state => state.topics);
    
    return (
        <Drawer
            id="app-drawer"
            dismissible
            open={open}
        >
            <DrawerContent>
                <ListGroup>
                    <List>
                        {[
                            { title: 'Главная', icon: 'home', to: '/', exact: true },
                            { title: 'Новое', icon: 'new_releases', to: '/new' }
                        ].map(item =>
                            <ListItem
                                key={item.icon}
                                component={NavLink}
                                to={item.to}
                                exact={item.exact}
                                activeClassName="mdc-list-item--activated"
                            >
                                <ListItemGraphic>
                                    <Icon>{item.icon}</Icon>
                                </ListItemGraphic>

                                <ListItemText>
                                    {item.title}
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                    
                    <ListDivider element="hr" />

                    <List>
                        {topics.map(topic =>
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
                </ListGroup>
            </DrawerContent>
        </Drawer>
    );
}