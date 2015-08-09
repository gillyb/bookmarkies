angular.module('bookmarkies').directive('bookmarksSearchFilter', ['$rootScope', 'SearchFilterService', function($rootScope, SearchFilterService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/search-filter/search-filter.html',
        link: function(scope) {
            scope.addTag = function(tag) {
                SearchFilterService.addFilter(tag);
            };

            scope.removeTag = function(tag) {
                SearchFilterService.removeFilter(tag);
            };
        }
    };
}]);