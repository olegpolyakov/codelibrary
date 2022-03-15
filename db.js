/* eslint no-console: 'off' */

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.set('toObject', {
    virtuals: true,
    getters: true,
    versionKey: false
});

mongoose.set('toJSON', {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform: (document, object, options) => {
        delete object._id;

        if (options.hide) {
            options.hide.split(' ').forEach(prop => delete object[prop]);
        }

        return object;
    }
});

mongoose.plugin(function normalizeMongooseError(schema, options) {
    schema.post(['save', 'update'], function(error, doc, next) {
        next(error.errors ? Object.values(error.errors)[0] : error);
    });
});

mongoose.connection.on('connected', () => console.log('Connected to database'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from database'));
mongoose.connection.on('error', error => () => console.error('Database connection error:', error));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

export default {
    client: null,
    connection: mongoose.connection,

    getClient() {
        if (this.client) return Promise.resolve(this.client);

        return new Promise((resolve, reject) => {
            this.connection.on('connected', () => {
                this.client = this.connection.getClient();
                resolve(this.client);
            });

            this.connection.on('error', reject);
        });
    },

    connect(uri) {
        return mongoose.connect(uri, {
            autoIndex: false,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            this.client = this.connection.getClient();
        });
    }
};