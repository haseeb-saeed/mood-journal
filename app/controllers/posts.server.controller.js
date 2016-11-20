'use strict';

const Post = require('mongoose').model('Post');

exports.list = function(req, res, next) {
    Post.find()
        .sort('-created_at')
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }

            req.posts = posts;
            next();
        });
};

exports.create = function(req, res, next) {
    const post = new Post(req.body);
    post.author = req.user.data._id;

    post.save(function(err) {
        if (err) {
            return next(err);
        }

        req.post = post;
        next();
    });
};

exports.read = function(req, res) {
    const user = req.user.data;

    if (req.posts) {
        req.posts.forEach(function(post) {
            post.upvoted = post.userHasUpvoted(user);
            post.bookmarked = post.userHasBookmarked(user);
        });
        res.json(req.posts);
    } else {
        req.post.upvoted = req.post.userHasUpvoted(user);
        req.post.bookmarked = req.post.userHasBookmarked(user);
        res.json(req.post);
    }
};

exports.update = function(req, res, next) {
    // TODO: Probably want to sanitize the request's body
    Post.findByIdAndUpdate(req.post.id, req.body, { new: true }, function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, post) {
        if (err) {
            return next(err);
        }
        req.post = post;
        next();
    });
};

exports.addUpvote = function(req, res, next) {
    const user = req.user.data;
    if (!req.post.userHasUpvoted(user)) {
        Post.findByIdAndUpdate(req.post.id, { $push: { upvotes: user._id }}, { new: true }, function(err, post) {
            if (err) {
                next(err);
            }
            req.post = post;
            next();
        });
    } else {
        next();
    }
};

exports.removeUpvote = function(req, res, next) {
    const user = req.user.data;
    if (req.post.userHasUpvoted(user)) {
        Post.findByIdAndUpdate(req.post.id, { $pull: { upvotes: user._id }}, { new: true }, function(err, post) {
            if (err) {
                next(err);
            }
            req.post = post;
            next();
        });
    } else {
        next();
    }
};

exports.addBookmark = function(req, res, next) {
    const user = req.user.data;
    if (!req.post.userHasBookmarked(user)) {
        Post.findByIdAndUpdate(req.post.id, { $push: { bookmarks: user._id }}, { new: true }, function(err, post) {
            if (err) {
                next(err);
            }
            req.post = post;
            next();
        });
    } else {
        next();
    }
}

exports.removeBookmark = function(req, res, next) {
    const user = req.user.data;
    if (req.post.userHasBookmarked(user)) {
        Post.findByIdAndUpdate(req.post.id, { $pull: { bookmarks: user._id }}, { new: true }, function(err, post) {
            if (err) {
                next(err);
            }
            req.post = post;
            next();
        });
    } else {
        next();
    }
}

exports.getPostById = function(req, res, next, id) {
    Post.findOne({
        _id: id,
    }, function(err, post) {
        if (err) {
            next(err);
        } else {
            req.post = post;
            next();
        }
    });
};
