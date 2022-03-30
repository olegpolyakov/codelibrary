import React from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'mdc-react';

const items = [
    { url: '/books/liked', text: 'Понравившиеся', icon: 'thumb_up_alt' },
    { url: '/books/marked', text: 'Отложенные', icon: 'bookmark' },
    { url: '/books/read', text: 'Прочитанные', icon: 'check_box' }
];

export default function FilterList({ user }) {
    return (
        <List>
            {items.map(item =>
                <List.Item
                    key={item.url}
                    component={NavLink}
                    to={item.url}
                    activeClassName="mdc-list-item--activated"
                    icon={item.icon}
                    text={item.text}
                />
            )}
        </List>
    );
}