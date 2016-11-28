'use strict';

const app = angular.module('moodJournal', ['ngResource', 'ui.router', 'ngCookies', 'ngAnimate', 'mgcrea.ngStrap']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
        })
        .state('post', {
            url:'/posts/:id',
            templateUrl: 'views/post.html',
            controller: 'PostCtrl',
        })
        .state('about', {
            url:'/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
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
