'use strict';

const Post = require('mongoose').model('Post');

exports.list = function(req, res) {
    Post.find({ author: req.user.id })
        .exec(function(err, posts) {
            if (err) {
                console.log("Shit, listing posts gave me an error");
                return;
            }

            res.json(posts);
        });
};

exports.create = function(req, res) {
    const post = new Post(req.body);
    post.author = req.user.id;

    post.save(function(err) {
        if (err) {
            console.log("Shit, creating a post gave me an error");
            return;
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


exports.update = function(req, res) {
    // TODO: Probably want to sanitize the request's body
    Post.findByIdAndUpdate(req.post.id, req.body, function(err, post) {
        if (err) {
            console.log("Shit, updating a post gave me an error");
            return;
        }

        res.json(req.post);
    });
};

exports.delete = function(req, res) {
    req.post.remove(function(err, post) {
        if (err) {
            console.log("Shit, deleting a post gave me an error");
            return;
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
