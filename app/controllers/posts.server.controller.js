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
            console.log("Shit, listing posts gave me an error");
            return;
        }

        res.json(post);
    });
};

exports.new = function(req, res) {
    res.render('new_post');
};

exports.read = function(req, res) {

};

exports.delete = function(req, res) {

};
