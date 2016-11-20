'using strict';

angular.module('moodJournal').factory('Posts', ['$resource', function($resource) {
    return $resource('/api/posts/:id', null, {
        addUpvote: {
            method: 'POST',
            url: '/api/posts/:id/upvote',
            params: {
                id: '@id',
            },
        },
        removeUpvote: {
            method: 'DELETE',
            url: '/api/posts/:id/upvote',
            params: {
                id: '@id',
            },
        },
        addBookmark: {
            method: 'POST',
            url: '/api/posts/:id/bookmark',
            params: {
                id: '@id',
            },
        },
        removeBookmark: {
            method: 'DELETE',
            url: '/api/posts/:id/bookmark',
            params: {
                id: '@id',
            },
        },
    });
}]);
