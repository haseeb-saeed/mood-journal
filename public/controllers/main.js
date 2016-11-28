'use strict';

angular.module('moodJournal').controller('MainCtrl',
    ['$scope', 'Posts', 'Auth', function($scope, Posts, Auth) {
        $scope.test = 'New posts';
        console.log($scope.query);


        $scope.posts = Posts.query(function(data) {
            console.log('Success getting posts');
            console.log(data);
        }, function(error) {
            console.log('Error getting posts');
            console.log(error);
        });

        $scope.createPost = function() {
            const post = new Posts(this.post);
            post.$save(function(data) {
                console.log('Success creating post');
                console.log(data);
                this.posts.unshift(data);
                this.post = '';
            }.bind(this), function(error) {
                console.log('Error creating post');
                console.log(error);
            });
        };

        $scope.filterAllPosts = function() {
            console.log('Filtering all posts');
        };

        $scope.filterUserPosts = function() {
            console.log('Filtering user posts');
        };

        $scope.filterBookmarkedPosts = function() {
            console.log('Filtering bookmarked posts');
        };
    }]
);
