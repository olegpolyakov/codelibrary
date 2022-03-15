export default (error, req, res, next) => {
    if (error.code === 'EBADCSRFTOKEN') {
        error.status = 403;
        error.message = 'Ты не тот кем хочешь казаться.';
    } else if (error.code === 'user_denied') {
        return res.redirect('/');
    } else if (error.status !== 404) {
        error.url = req.url;
        error.method = req.method;
        error.user = req.user?.id;
    }

    console.error(error);

    next(error);
};