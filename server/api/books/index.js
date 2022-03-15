import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getMany)
        .post(controller.create);

    router.route('/:book')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:book/likes')
        .post(controller.addLike)
        .delete(controller.removeLike);

    return router;
};