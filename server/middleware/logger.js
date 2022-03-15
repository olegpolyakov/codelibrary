import morgan from 'morgan';

export default isDevelopment => morgan(isDevelopment ? 'dev' : 'combined');