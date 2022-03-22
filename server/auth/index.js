import { Router } from 'express';

import Controller from './controller';
import Middleware from './middleware';

export default context => {
    const router = Router();
    const { auth, callback, logout } = Controller(context);
    const { authenticate } = Middleware(context);

    router.use(authenticate);
    router.get('/auth', auth);
    router.get('/auth/callback', callback);
    router.get('/auth/logout', logout);

    return router;
};