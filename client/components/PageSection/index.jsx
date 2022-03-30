import { Typography } from 'mdc-react';

import './index.scss';

export default function PageSection({ title, description, children, ...props }) {
    return (
        <section className="page-section" {...props}>
            {title &&
                <Typography className="page-section__title" variant="headline6">{title}</Typography>
            }

            {description &&
                <Typography className="page-section__description" variant="body1">{description}</Typography>
            }

            {children}
        </section>
    );
}