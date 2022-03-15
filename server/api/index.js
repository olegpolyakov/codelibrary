import { Router } from 'express';

import books from './books';
import topics from './topics';
import user from './user';
import users from './users';

export default context => {
    const router = Router();

    router.use('/books', books(context));
    router.use('/topics', topics(context));
    router.use('/user', user(context));
    router.use('/users', users(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: error.message || error
        });
    });

    return router;
};