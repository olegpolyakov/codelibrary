import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Book = new Schema({
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    authors: { type: [String], required: true },
    publisher: { type: String },
    description: { type: String, default: '', trim: true },
    contents: { type: String, default: '', trim: true },
    published: { type: Boolean, default: false },
    date: { type: Date, get: date => date.toISOString().slice(0, 10) },
    topics: [{ type: String, ref: 'Topic' }],
    tags: [{ type: String }],
    edition: { type: Number, default: 1, min: 1 },
    pages: { type: Number, min: 0, default: 0 },
    language: { type: String, enum: ['en', 'ru'] },
    level: { type: String, enum: ['beg', 'int', 'adv'] },
    pageUrl: String,
    imageFormat: { type: String },
    documentFormat: { type: String },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: false,
    toJSON: {
        getters: true,
        transform: (book, object, { user }) => {
            if (!user) return object;

            object.liked = book.likedBy.includes(user.id);
            object.marked = user.markedBooks.includes(book.id);
            object.read = user.readBooks.includes(book.id);

            return object;
        }
    }
});

Book.statics.search = function(query) {
    const regex = new RegExp(query, 'i');

    return this.find({ published: true }).or([
        { slug: regex },
        { title: regex }
    ]);
};

Book.virtual('url').get(function() {
    return this.slug && `/books/${this.slug}`;
});

Book.virtual('uri').get(function() {
    return this.id && `/books/${this.id}`;
});

Book.virtual('likes').get(function() {
    return this.likedBy?.length;
});

Book.virtual('imageUrl').get(function() {
    return this.imageFormat && `${process.env.STORAGE_URL}/covers/${this.slug}.${this.imageFormat}`;
});

Book.virtual('documentUrl').get(function() {
    return this.documentFormat && `${process.env.STORAGE_URL}/books/${this.slug}.${this.documentFormat}`;
});

Book.virtual('topic', {
    ref: 'Topic',
    localField: 'topics',
    foreignField: '_id',
    justOne: true
});

Book.virtual('markedBy', {
    ref: 'User',
    localField: '_id',
    foreignField: 'markedBooks',
    justOne: false
});

Book.virtual('readBy', {
    ref: 'User',
    localField: '_id',
    foreignField: 'readBooks',
    justOne: false
});

export default model('Book', Book);