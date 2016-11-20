'using strict';

angular.module('moodJournal').factory('Auth',
    ['$http', '$window', '$location', function($http, $window, $location) {
        return {
            login: function(user) {
                return $http.post('/api/authenticate', user)
                    .success(function(data) {
                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.currentUser = JSON.stringify(data.user);
                        $location.path('/');
                    })
                    .error(function() {
                        console.log('Login error');
                    });
            },
            register: function(user) {
                return $http.post('/api/register', user)
                    .success(function(data) {
                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.currentUser = JSON.stringify(data.user);
                        $location.path('/');
                    })
                    .error(function() {
                        console.log('Register error');
                    });
            },
            logout: function() {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.currentUser;
                $location.path('/login');
            },
            isLoggedIn: function() {
                return !!$window.sessionStorage.token && !!$window.sessionStorage.currentUser;
            },
            getCurrentUser: function() {
                return JSON.parse($window.sessionStorage.currentUser);
            },
        };
    }]
);
