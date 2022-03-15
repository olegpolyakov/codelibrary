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
                    message: 'Пользователь обновлен',
                    user
                });
            })
            .catch(next);
    },

    addMarkedBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $addToSet: req.body.bookId
        }, {
            new: true
        })
            .then(user => {
                res.status(200).json({
                    ok: true,
                    message: 'Пользователь обновлен',
                    user
                });
            })
            .catch(next);
    },

    removeMarkedBook: (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $addToSet: req.body.bookId
        }, {
            new: true
        })
            .then(user => {
                res.status(200).json({
                    ok: true,
                    message: 'Пользователь обновлен',
                    user
                });
            })
            .catch(next);
    }
});