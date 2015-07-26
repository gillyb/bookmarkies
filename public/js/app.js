angular.module('bookmarkies', ['ngSanitize', 'ngRoute', 'ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/login/login.html',
                controller: 'LoginController'
            }).state('home', {
                url: '/',
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            });
    }).config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self'
        ]);
    });