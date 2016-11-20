'use strict';

angular.module('moodJournal').controller('PostCtrl',
    ['$scope', '$routeParams', '$location', 'Posts', 'Auth',
        function($scope, $routeParams, $location, Posts, Auth) {
            console.log($routeParams.id)
            $scope.post = Posts.get({ id: $routeParams.id }, function(data) {
                console.log('Success getting post');
                console.log(data);
            }, function(error) {
                console.log('Failure getting post');
                console.log(error);
            });

            $scope.deletePost = function() {
                Posts.remove({ id: this.post._id }, function(data) {
                    console.log('Success removing post');
                    console.log(data);
                    $location.path('/');
                }, function(error) {
                    console.log('Error removing post');
                    console.log(error);
                });
            };

            $scope.belongsToCurrentUser = function() {
                const user = Auth.getCurrentUser();
                return user._id === this.post.author;
            };

            $scope.addUpvote = function() {
                Posts.addUpvote({ id: this.post._id }, function(data) {
                    console.log('Success adding upvote');
                    console.log(data);
                    this.post = data;
                }.bind(this), function(error) {
                    console.log('Failure adding upvote');
                    console.log(error);
                });
            };

            $scope.removeUpvote = function() {
                Posts.removeUpvote({ id: this.post._id }, function(data) {
                    console.log('Success removing upvote');
                    console.log(data);
                    this.post = data;
                }.bind(this), function(error) {
                    console.log('Failure removing upvote');
                    console.log(error);
                });
            };

            $scope.addBookmark = function() {
                Posts.addBookmark({ id: this.post._id }, function(data) {
                    console.log('Success adding bookmark');
                    console.log(data);
                    this.post = data;
                }.bind(this), function(error) {
                    console.log('Failure adding bookmark');
                    console.log(error);
                });
            };

            $scope.removeBookmark = function() {
                Posts.removeBookmark({ id: this.post._id }, function(data) {
                    console.log('Success removing bookmark');
                    console.log(data);
                    this.post = data;
                }.bind(this), function(error) {
                    console.log('Failure removing bookmark');
                    console.log(error);
                });
            };

            $scope.isUpvoted = function() {
                return this.post.upvoted;
            };

            $scope.isBookmarked = function() {
                return this.post.bookmarked;
            };
        }
    ]
);
