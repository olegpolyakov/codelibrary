import helmet from 'helmet';
import ms from 'ms';

export default isProduction => helmet({
    contentSecurityPolicy: false,
    frameguard: {
        action: 'sameorigin'
    },
    hsts: isProduction ? { maxAge: ms('1 year') } : false,
    referrerPolicy: {
        policy: 'strict-origin'
    }
});