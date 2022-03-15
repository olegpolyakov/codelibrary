import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.get);

    router.route('/books/marked')
        .post(controller.addMarkedBook)
        .delete(controller.removeMarkedBook);

    return router;
};