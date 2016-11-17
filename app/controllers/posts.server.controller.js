'use strict';

const Post = require('mongoose').model('Post');

exports.list = function(req, res, next) {
    Post.find({ author: req.user.id })
        .sort('-created_at')
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }

            res.render('posts', {
                posts: posts,
            });
        });
};

exports.create = function(req, res, next) {
    const post = new Post(req.body);
    post.author = req.user.id;

    post.save(function(err) {
        if (err) {
            return next(err);
        }

        res.redirect('/posts');
    });
};

exports.new = function(req, res) {
    res.render('new_post');
};

exports.read = function(req, res) {
    res.render('post', {
        post: req.post,
    });
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

        res.redirect('/posts');
    });
};

exports.getPostById = function(req, res, next, id) {
    Post.findOne({
        _id: id,
        author: req.user.id,
    }, function(err, post) {
        if (err) {
            next(err);
        } else {
            req.post = post;
            next();
        }
    });
};

exports.upvote = function(req, res, next) {
    const callback = function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    }

    if (req.post.userHasUpvoted(req.user)) {
        Post.findByIdAndUpdate(req.post.id, { $pull: { upvotes: req.user.id }}, { new: true }, callback);
    } else {
        Post.findByIdAndUpdate(req.post.id, { $push: { upvotes: req.user.id }}, { new: true }, callback);
    }
};

exports.bookmark = function(req, res, next) {
    const callback = function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(req.post);
    }

    if (req.post.userHasBookmarked(req.user)) {
        Post.findByIdAndUpdate(req.post.id, { $pull: { bookmarks: req.user.id }}, { new: true }, callback);
    } else {
        Post.findByIdAndUpdate(req.post.id, { $push: { bookmarks: req.user.id }}, { new: true }, callback);
    }
};

exports.listBookmarked = function(req, res, next) {
    Post.find({ bookmarks: req.user.id })
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }

            res.json(posts);
        });
};

exports.random = function(req, res, next) {
    Post.random(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
};
