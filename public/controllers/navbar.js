'use strict';

angular.module('moodJournal').controller('NavbarCtrl',
    ['$scope', 'Auth', function($scope, Auth) {
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };
    }]
);
