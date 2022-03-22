export default ({
    models: { User }
}) => ({
    get: (req, res, next) => {
        res.json({
            ok: true,
            data: req.user
        });
    },

    update: (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then(user => {
                res.status(200).json({
                    ok: true,
                    message: 'Данные аккаунта изменены',
                    user
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then(user => {
                res.status(200).json({
                    ok: true,
                    message: 'Ваш аккаунт удален',
                    user
                });
            })
            .catch(next);
    },

    addMarkedBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $addToSet: {
                markedBooks: req.body.bookId
            }
        }, {
            new: true
        }).then(user => {
            res.status(200).json({
                ok: true,
                message: 'Книга отмечена',
                data: {
                    id: req.body.bookId,
                    marked: user.markedBooks.includes(req.body.bookId)
                }
            });
        }).catch(next);
    },

    removeMarkedBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $pull: {
                markedBooks: req.body.bookId
            }
        }, {
            new: true
        }).then(user => {
            res.status(200).json({
                ok: true,
                message: 'Отметка снята',
                data: {
                    id: req.body.bookId,
                    marked: user.markedBooks.includes(req.body.bookId)
                }
            });
        }).catch(next);
    },

    addReadBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $addToSet: {
                readBooks: req.body.bookId
            }
        }, {
            new: true
        }).then(user => {
            res.status(200).json({
                ok: true,
                message: 'Книга отмечена',
                data: {
                    id: req.body.bookId,
                    read: user.readBooks.includes(req.body.bookId)
                }
            });
        }).catch(next);
    },

    removeReadBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $pull: {
                readBooks: req.body.bookId
            }
        }, {
            new: true
        }).then(user => {
            res.status(200).json({
                ok: true,
                message: 'Отметка снята',
                data: {
                    id: req.body.bookId,
                    read: user.readBooks.includes(req.body.bookId)
                }
            });
        }).catch(next);
    }
});