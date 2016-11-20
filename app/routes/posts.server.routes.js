'use strict';

const posts = require('../controllers/posts.server.controller');
const users = require('../controllers/users.server.controller');
const expressJwt = require('express-jwt');

module.exports = function(app) {
    app.route('/api/posts')
        .all(expressJwt({secret: 'secret'}))
        .get(posts.list)
        .post(posts.create)
        .all(posts.read);

    app.route('/api/posts/:postId')
        .all(expressJwt({secret: 'secret'}))
        .delete(posts.delete)
        .all(posts.read);

    app.route('/api/posts/:postId/upvote')
        .all(expressJwt({secret: 'secret'}))
        .post(posts.addUpvote)
        .delete(posts.removeUpvote)
        .all(posts.read);

    app.route('/api/posts/:postId/bookmark')
        .all(expressJwt({secret: 'secret'}))
        .post(posts.addBookmark)
        .delete(posts.removeBookmark)
        .all(posts.read);

    app.param('postId', posts.getPostById);
};
