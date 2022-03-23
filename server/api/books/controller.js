const allowedFields = ['authors', 'publisher', 'topics', 'tags', 'language', 'level'];

export default ({
    models: { Book }
}) => ({
    search: (req, res, next) => {
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

        Book.search(req.query.q)
            .select('slug title date documentFormat imageFormat')
            .skip(skip)
            .sort({ date: -1 })
            .limit(limit)
            .then(books => {
                res.json({
                    ok: true,
                    data: books
                });
            })
            .catch(next);
    },

    getMany: (req, res, next) => {
        const query = { ...req.query };

        if (!req.user?.isAdmin) {
            query.published = true;
        }

        Book.find(query)
            .select('slug title date documentFormat imageFormat')
            .sort({ date: -1 })
            .then(books => {
                res.json({
                    ok: true,
                    data: books.map(book => book.toJSON({ user: req.user }))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        const query = {
            slug: req.params.book
        };

        if (!req.user?.isAdmin) {
            query.published = true;
        }

        Book.findOne(query)
            .populate('topics', 'title')
            .then(book => {
                res.json({
                    ok: true,
                    data: book.toJSON({ user: req.user })
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Book.create(req.body)
            .then(book => {
                res.status(201).json({
                    ok: true,
                    message: 'Книга создана',
                    data: book
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        const fields = Object.keys(req.body).join(' ');

        Book.findByIdAndUpdate(req.params.book, {
            $set: req.body
        }, {
            new: true,
            select: fields
        }).then(book => {
            res.json({
                ok: true,
                message: 'Книга изменена',
                data: book
            });
        }).catch(next);
    },

    delete: (req, res, next) => {
        Book.findByIdAndDelete(req.params.book)
            .then(book => {
                res.status(200).json({
                    ok: true,
                    message: 'Книга удалена',
                    data: {
                        id: book.id
                    }
                });
            })
            .catch(next);
    },

    addLike: (req, res, next) => {
        Book.findByIdAndUpdate(req.params.book, {
            $addToSet: {
                likedBy: req.user.id
            }
        }, { new: true }).then(book => {
            if (!book) throw new Error('Книга не найдена');

            res.status(200).json({
                ok: true,
                data: {
                    id: book.id,
                    likes: book.likes,
                    liked: book.likedBy.includes(req.user.id)
                }
            });
        }).catch(next);
    },

    removeLike: (req, res, next) => {
        Book.findByIdAndUpdate(req.params.book, {
            $pull: {
                likedBy: req.user.id
            }
        }, { new: true }).then(book => {
            if (!book) throw new Error('Книга не найдена');

            res.status(200).json({
                ok: true,
                data: {
                    id: book.id,
                    likes: book.likes,
                    liked: book.likedBy.includes(req.user.id)
                }
            });
        }).catch(next);
    }
});