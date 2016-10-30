'use strict';

const Post = require('mongoose').model('Post');

exports.list = function(req, res, next) {
    Post.find({ author: req.user.id })
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }

            res.json(posts);
        });
};

exports.create = function(req, res, next) {
    const post = new Post(req.body);
    post.author = req.user.id;

    post.save(function(err) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
};

exports.new = function(req, res) {
    res.render('new_post');
};

exports.read = function(req, res) {
    res.json(req.post);
};

exports.update = function(req, res, next) {
    // TODO: Probably want to sanitize the request's body
    Post.findByIdAndUpdate(req.post.id, req.body, function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(req.post);
    });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
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

};

exports.bookmark = function(req, res, next) {

};
