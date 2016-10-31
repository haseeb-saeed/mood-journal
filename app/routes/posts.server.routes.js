'use strict';

const posts = require('../controllers/posts.server.controller');
const users = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/posts/*')
        .all(users.isLoggedIn);

    app.route('/posts')
        .get(posts.list)
        .post(posts.create);

    app.route('/posts/:postId')
        .get(posts.read)
        .put(posts.update)
        .delete(posts.delete);

    app.route('/posts/new')
        .get(posts.new);

    app.route('/posts/:postId/upvote')
      .post(posts.upvote)

    app.route('/posts/:postId/bookmark')
      .post(posts.bookmark)

    app.param('postId', posts.getPostById);
};
