export function allowAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        next({
            code: 401,
            message: 'Для продолжения необходимо войти'
        });
    }
}