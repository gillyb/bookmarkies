angular.module('bookmarkies').directive('bookmarksSearchFilter', ['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/search-filter/search-filter.html',
        link: function(scope) {
            scope.addTag = function(tag) {
                $rootScope.$broadcast('bookmarks-filter.add-tag', tag);
            };

            scope.removeTag = function(tag) {
                $rootScope.$broadcast('bookmarks-filter.remove-tag', tag);
            };
        }
    };
}]);