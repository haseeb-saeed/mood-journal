'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
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
    upvoted: {
        type: Boolean,
        default: false,
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    bookmarked: {
        type: Boolean,
        default: false,
    },
});

PostSchema.methods.userHasUpvoted = function(user) {
    return this.upvotes.some(function(id) {
        return id.equals(user._id);
    });
}

PostSchema.methods.userHasBookmarked = function(user) {
    return this.bookmarks.some(function(id) {
        return id.equals(user._id);
    });
}

PostSchema.methods.toJSON = function() {
    const post = this.toObject();

    post.numUpvotes = this.upvotes.length;
    delete post.upvotes;
    delete post.bookmarks;

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
