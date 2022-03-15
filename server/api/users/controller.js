export default ({
    models: { User }
}) => ({
    getMany: (req, res, next) => {
        const query = { ...req.query };
        const page = req.query.page || 0;
        const limit = 100;
        const skip = page * limit;

        if (query.search) {
            const regex = new RegExp(req.query.search.trim(), 'i');

            query.$or = [
                { firstname: regex },
                { lastname: regex },
                { username: regex },
                { email: regex }
            ];

            delete query.search;
        }

        User.find(query)
            .select('firstname lastname email activated access createdAt')
            .skip(skip)
            .sort({ 'access.level': -1, createdAt: -1 })
            .limit(limit)
            .then(users => {
                res.json({
                    ok: true,
                    data: users
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        User.findById(req.params.id)
            .populate({
                path: 'payments',
                options: { sort: 'createdAt -1' }
            })
            .then(user => {
                if (!user) throw new Error('Пользователь не найден');

                res.json({
                    ok: true,
                    data: user.toJSON({ getters: true, virtuals: true })
                });
            })
            .catch(next);
    },

    getUser: (req, res, next) => {
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

    delete: (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
            .then(user => {
                res.status(200).json({
                    ok: true,
                    message: 'Пользователь удален',
                    data: {
                        id: user.id
                    }
                });
            })
            .catch(next);
    }
});