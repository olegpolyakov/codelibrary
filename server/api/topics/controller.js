export default ({
    models: { Topic }
}) => ({
    findOne: (req, res, next, id) => {
        Topic.findById(id)
            .then(topic => {
                if (!topic) return next({ status: 404, message: 'Тема не найдена' });

                req.topic = topic;

                next();
            })
            .catch(next);
    },

    getAll: (req, res, next) => {
        Topic.find().sort({ _id: 1 })
            .then(topics => res.json({
                ok: true,
                data: topics
            }))
            .catch(next);
    },

    getOne: (req, res) => {
        res.json({ ok: true, topic: req.topic });
    },

    create: (req, res, next) => {
        Topic.create({
            _id: req.body.slug,
            ...req.body
        })
            .then(topic => res.json({
                ok: true,
                message: 'Тема создана',
                data: topic
            }))
            .catch(next);
    },

    update: (req, res, next) => {
        Topic.findByIdAndUpdate(req.params.topic, { $set: req.body }, { new: true })
            .then(topic => res.json({
                ok: true,
                message: 'Тема изменена',
                topic
            }))
            .catch(next);
    },

    delete: (req, res, next) => {
        Topic.findByIdAndDelete(req.params.topic)
            .then(topic => res.json({
                ok: true,
                message: 'Тема удалена',
                topic
            }))
            .catch(next);
    }
});