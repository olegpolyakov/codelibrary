import session from 'express-session';
import MongoStore from 'connect-mongo';
import ms from 'ms';

export default ({ config, db }) => session({
    name: 'sessionId',
    secret: config.SESSION_SECRET,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
        domain: config.APP_DOMAIN,
        httpOnly: true,
        secure: config.APP_ENV === 'production',
        signed: true,
        maxAge: ms('3 days')
    },
    store: MongoStore.create({
        client: db.connection.client,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24, // 1 day
        stringify: false
    })
});