angular.module('bookmarkies').directive('userPresence', ['$location', 'UserService', function($location, UserService) {

    var html = '<span class="user-presence link pull-right" ng-bind-template="{{user.profile.name}}" ng-click="goToUserPage()"></span>';

    return {
        restrict: 'E',
        template: html,
        link: function(scope) {
            UserService.getUser().then(function(user) {
                scope.user = user;
            });

            scope.goToUserPage = function() {
                $location.url('/user-settings');
            };
        }
    };
}]);