import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Topic = new Schema({
    _id: String,
    title: String,
    description: String
}, {
    toJSON: {
        transform: (topic, object, { user }) => {
            if (!user) return object;

            if (user.markedTopics.includes(topic.id)) {
                object.marked = true;
            }

            return object;
        }
    }
});

Topic.virtual('slug').get(function() {
    return this._id;
});

Topic.virtual('url').get(function() {
    return `/topics/${this._id}`;
});

Topic.virtual('imageUrl').get(function() {
    return `${process.env.STORAGE_URL}/topics/${this._id}.png`;
});

Topic.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'topics'
});

export default model('Topic', Topic);