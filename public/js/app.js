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

angular.module('bookmarkies').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$timeout', '$q', function ($timeout, $q) {
        return {
            request: function(config) {
                config.headers['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
                return config;
            },
            responseError: function (error) {
                if (error.status == 401 || error.status == 403) {
                    window.logout();
                    window.location = '/gilly';
                    return $q.reject(error);
                }
                else
                    return $q.reject(error);
            }
        };
    }]);
}]);