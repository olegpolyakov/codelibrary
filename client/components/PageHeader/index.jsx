import {
    Layout,
    Typography
} from 'mdc-react';

import './index.scss';

export default function PageHeader({ title, description, actions }) {
    return (
        <header className="page-header">
            <Layout className="page-header__main">
                <Typography className="page-header__title" type="headline4" noMargin>{title}</Typography>

                {description &&
                    <Typography className="page-header__description" type="body1" noMargin>{description}</Typography>
                }
            </Layout>

            {actions &&
                <Layout className="page-header__actions" row alignItems="center">
                    {actions}
                </Layout>
            }
        </header>
    );
}