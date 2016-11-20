'use strict';

angular.module('moodJournal').controller('LoginCtrl',
    ['$scope', 'Auth', function($scope, Auth) {
        $scope.login = function(user) {
            Auth.login(user);
        };
    }]
);
