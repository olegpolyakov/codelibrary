import * as config from './config';
import db from './db';
import createServer from './server';

const context = {
    config,
    db
};

await db.connect(config.DB_CONNECTION_STRING);
createServer(context).listen();