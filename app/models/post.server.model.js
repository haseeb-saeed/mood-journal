'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

PostSchema.methods.toJSON = function() {
    const post = this.toObject();

    // Posts are anonymous
    delete post.author;
    return post;
}

mongoose.model('Post', PostSchema);
