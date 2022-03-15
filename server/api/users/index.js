import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);

    router.get('/me', controller.getUser);

    router.route('/:id')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    return router;
};