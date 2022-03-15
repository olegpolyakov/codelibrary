export default ({ models: { User } }) => ({
    authenticate(req, res, next) {
        const userId = req.session?.userId;

        if (!userId) return next();

        return User.findById(userId)
            .then(user => {
                req.user = user;
                next();
            });
    }
});