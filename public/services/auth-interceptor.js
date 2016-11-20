'using strict';

angular.module('moodJournal').factory('AuthInterceptor',
    ['$window', function($window) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                const token = $window.sessionStorage.token
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function(response) {
                return response;
            },
        };
    }]
);
