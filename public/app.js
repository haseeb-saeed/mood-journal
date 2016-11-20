'use strict';

const app = angular.module('moodJournal', ['ngResource', 'ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
        })
        .when('/posts/:id', {
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
        })
        .otherwise({
            redirectTo: '/',
        });

    $httpProvider.interceptors.push('AuthInterceptor');
}]);

app.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event) {
        const isLoggedIn = Auth.isLoggedIn();
        const loggedOutPath = $location.path() == '/login' || $location.path() == '/register';

        if (!isLoggedIn && !loggedOutPath) {
            $location.path('/login');
            event.preventDefault();
        } else if (isLoggedIn && loggedOutPath) {
            $location.path('/');
            event.preventDefault();
        }
    });
}]);
