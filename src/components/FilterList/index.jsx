import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Icon,
    List, ListItem, ListItemGraphic, ListItemText
} from 'mdc-react';

export default function FilterList({ user }) {
    return (
        <List>
            {[
                { url: '/favorite', text: 'Понравившиеся', icon: 'favorite' },
                { url: '/marked', text: 'Отложенные', icon: 'bookmark' },
                { url: '/read', text: 'Прочитанные', icon: 'check_box' }
            ].map(item =>
                <ListItem
                    key={item.url}
                    component={NavLink}
                    to={item.url}
                    activeClassName="mdc-list-item--activated"
                >
                    <ListItemGraphic>
                        <Icon>{item.icon}</Icon>
                    </ListItemGraphic>

                    <ListItemText>
                        {item.text}
                    </ListItemText>
                </ListItem>
            )}
        </List>
    );
}