import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.param('topic', controller.findOne);

    router.route('/')
        .get(controller.getAll)
        .post(controller.create);

    router.route('/:topic')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    return router;
};