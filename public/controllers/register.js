'use strict';

angular.module('moodJournal').controller('RegisterCtrl',
    ['$scope', 'Auth', function($scope, Auth) {
        $scope.register = function(user) {
            Auth.register(user);
        };
    }]
);
