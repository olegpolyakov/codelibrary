import cookie from 'cookie-parser';

export default [cookie(), (req, res, next) => {
    if (req.cookies.cookieConsent === 'true') {
        res.locals.hideCookieBanner = true;
    }

    next();
}];