import axios from 'axios';

export default ({
    config,
    models: { User }
}) => ({
    auth: (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.GITHUB_CLIENT_ID}&redirect_uri=${config.GITHUB_CALLBACK_URL}&scope=read:user%20user:email`);
    },

    callback: async (req, res, next) => {
        try {
            const { data } = await axios.post('https://github.com/login/oauth/access_token', {
                client_id: config.GITHUB_CLIENT_ID,
                client_secret: config.GITHUB_CLIENT_SECRET,
                redirect_uri: config.GITHUB_CALLBACK_URL,
                code: req.query.code
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            const response = await axios.get('https://api.github.com/user', {
                headers: {
                    'User-Agent': 'olegpolyakov',
                    'Authorization': `token ${data.access_token}`
                }
            });

            const user = await User.authenticate(response.data);

            req.session.userId = user.id;
            res.redirect('/');
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
});