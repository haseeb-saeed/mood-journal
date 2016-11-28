'use strict';

angular.module('moodJournal').filter('PostFilter', ['Auth', function(Auth) {
    return function (posts, type) {
        return posts.filter(function(post) {
            const userId = Auth.getCurrentUser()._id;

            if (type === 'AUTHOR') {
                return post.author === userId;
            } else if (type === 'BOOKMARK') {
                return post.bookmarked;
            } else {
                return true;
            }
        });
    };
}]);
