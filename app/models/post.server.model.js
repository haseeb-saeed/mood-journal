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
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

PostSchema.methods.userHasUpvoted = function(user) {
    return this.upvotes.some(function(id) {
        return id === user.id;
    });
}

PostSchema.methods.userHasBookmarked = function(user) {
    return this.bookmarks.some(function(id) {
        return id === user.id;
    });
}

PostSchema.methods.toJSON = function() {
    const post = this.toObject();

    // Posts are anonymous
    delete post.author;
    return post;
}

PostSchema.statics.random = function(callback) {
    this.count(function (err, count) {
        if (err) {
            return callback(err);
        }
        const skip = Math.floor(Math.random() % count);
        this.findOne().skip(skip).exec(callback);
    }.bind(this));
};

mongoose.model('Post', PostSchema);
