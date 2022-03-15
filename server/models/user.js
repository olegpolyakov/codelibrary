import crypto from 'crypto';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const User = new Schema({
    githubId: { type: String },
    email: {
        type: String,
        required: [true, 'Поле Email обязательно для заполнения.'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [7, 'Адрес электронный почты слишком короткий.'],
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
        lowercase: true,
        minlength: [2, 'Имя пользователя слишком короткое.'],
        maxlength: [64, 'Имя пользователя слишком длинное.'],
        match: [/^[a-zA-Z0-9]+$/, 'Имя пользователя должно содержать только латинские буквы и цифры.'],
        set: value => value === '' ? undefined : value
    },
    firstname: {
        type: String,
        trim: true,
        minlength: [2, 'Имя слишком короткое.'],
        maxlength: [64, 'Имя слишком длинное.'],
        match: [/^[^0-9 ]+$/, 'В имени не должно быть пробелов и цифр.']
    },
    lastname: {
        type: String,
        trim: true,
        minlength: [2, 'Фамилия слишком короткая.'],
        maxlength: [64, 'Фамилия слишком длинная.'],
        match: [/^[^0-9 ]+$/, 'В фамилии не должно быть пробелов и цифр.']
    },
    roles: [String],
    avatarUrl: { type: String },
    markedTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    markedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    readBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
    timestamps: true,
    toJSON: {
        transform: (document, object, options) => {
            delete object._id;
            delete object.roles;

            return object;
        }
    }
});

User.statics.authenticate = function(data) {
    const [firstname, lastname] = data.name?.split(' ') || [];
    const email = data.email;
    const username = data.login;
    const avatarUrl = data.avatar_url;

    return this.findOneAndUpdate({ email }, {
        firstname,
        lastname,
        email,
        username,
        avatarUrl
    }, {
        upsert: true,
        new: true
    });
};

User.virtual('displayName').get(function() {
    if (this.firstname && this.lastname) {
        return this.firstname + ' ' + this.lastname;
    } else if (this.firstname) {
        return this.firstname;
    } else if (this.username) {
        return this.username;
    }
});

User.virtual('gravatar').get(function() {
    const size = 100;
    const imageset = 'retro';
    const rating = 'g';
    const hash = crypto.createHash('md5').update(this.email || 'email@domain.com').digest('hex');

    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${imageset}&r=${rating}`;
});

User.virtual('photo').get(function() {
    let photo = '';

    if (!photo) photo = this.gravatar;

    return photo;
});

User.virtual('url').get(function() {
    return `/users/${this.username || this.id}`;
});

User.virtual('isAdmin').get(function() {
    return this.roles?.includes('admin');
});

User.virtual('likedBooks', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'likedBy',
    justOne: false
});

User.virtual('dislikedBooks', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'dislikedBy',
    justOne: false
});

User.pre('save', function(next) {
    if (!this.isModified('email')) return next();

    mongoose.models.User.findOne({ email: this.email })
        .then(user => {
            if (user) next(new Error('Пользователь с таким адресом электронной почты уже зарегистрирован'));
            else next();
        });
});

User.pre('save', function(next) {
    if (!this.isModified('username')) return next();

    mongoose.models.User.findOne({
        $and: [
            { username: { $exists: true } },
            { username: this.username }
        ]
    }).then(user => {
        if (user) next(new Error('Пользователь с таким именем пользователя уже зарегистрирован'));
        else next();
    });
});

User.post('save', handleError);
User.post('update', handleError);

function handleError(error, user, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Имя пользователя или адрес электронной почты заняты.'));
    } else {
        next(error);
    }
}

export default model('User', User);