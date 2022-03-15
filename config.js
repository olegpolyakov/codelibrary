import path from 'path';

export const APP_ENV = process.env.NODE_ENV;
export const APP_IP = process.env.APP_IP;
export const APP_PORT = process.env.APP_PORT;
export const APP_DOMAIN = process.env.APP_DOMAIN;
export const APP_URL = process.env.APP_URL;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
export const SESSION_SECRET = 'BHve6rr4mAAP2w4G93qK';

export const ROOT_PATH = path.resolve('.');
export const LIB_PATH = path.resolve('node_modules');
export const PUBLIC_PATH = path.resolve('public');

export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;