angular.module('bookmarkies', ['ngSanitize', 'ngRoute', 'ngCookies', 'ui.router', 'ngTagsInput', 'ngDialog'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/login/login.html',
                controller: 'LoginController'
            }).state('home', {
                url: '/',
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            }).state('user-settings', {
                url: '/user-settings',
                templateUrl: 'js/user/settings.html',
                controller: 'UserSettingsController'
            }).state('list', {
                url: '/:listId/:listName',
                templateUrl: 'js/view-list/view-list.html',
                controller: 'ViewListController'
            });

        $urlRouterProvider.otherwise(function() {
            window.location = '/#/';
        });

    }).config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self'
        ]);
    });

angular.module('bookmarkies').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$timeout', '$q', function ($timeout, $q) {
        return {
            request: function(config) {
                config.headers['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
                return config;
            },
            responseError: function (error) {
                if (error.status == 401 || error.status == 403) {
                    // TODO: clear all local/session storage and cookies
                    window.location = '/#/login';
                    return $q.reject(error);
                }
                else
                    return $q.reject(error);
            }
        };
    }]);
}]);