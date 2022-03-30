import { Typography } from 'mdc-react';

import Page from '@/components/Page';
import PageContent from '@/components/PageContent';
import PageHeader from '@/components/PageHeader';

import './index.scss';

export default function NotFound() {
    return (
        <Page id="not-found-page">
            <PageHeader />

            <PageContent>
                <Typography type="headline4" noMargin>Кто ищет, тот всегда найдет...</Typography>
                <Typography type="headline6" noMargin>но не здесь :-)</Typography>
            </PageContent>
        </Page>
    );
}