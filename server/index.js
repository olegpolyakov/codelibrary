import path from 'path';
import fs from 'fs';
import express from 'express';

import api from './api';
import auth from './auth';
import { session } from './middleware';
import * as models from './models';

export default context => {
    const server = express();

    Object.assign(context, {
        models
    });

    const indexFile = fs.readFileSync(path.resolve(context.config.PUBLIC_PATH, 'index.html'));

    server.use(express.static('public'));
    server.use(express.json());
    server.use(session(context));
    server.use(auth(context));
    server.use('/api', api(context));

    server.get('*', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.send(indexFile);
    });

    return {
        listen() {
            return new Promise(resolve => {
                server.listen(context.config.APP_PORT, context.env.APP_IP, () => {
                    console.log('Server started');
                    resolve();
                });
            });
        }
    };
};