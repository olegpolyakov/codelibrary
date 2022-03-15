export default ({
    models: { Book }
}) => ({
    getMany: (req, res, next) => {
        Book.find({ published: true, ...req.query })
            .select('slug title date documentFormat imageFormat')
            .sort({ date: -1 })
            .then(books => {
                res.json({
                    ok: true,
                    data: books
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Book.findOne({ slug: req.params.book, published: true })
            //.populate('topics', 'title')
            .then(book => {
                res.json({
                    ok: true,
                    data: book
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
        }, {
            new: true
        }).then(book => {
            res.status(200).json({
                ok: true,
                data: {
                    id: book.id,
                    likes: book.likes,
                    likedBy: book.likedBy
                }
            });
        }).catch(next);
    },

    removeLike: (req, res, next) => {
        Book.findByIdAndUpdate(req.params.book, {
            $pull: {
                likes: req.user.id
            }
        }).then(book => {
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