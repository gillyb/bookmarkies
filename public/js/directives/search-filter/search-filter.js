angular.module('bookmarkies').directive('bookmarksSearchFilter', ['$rootScope', 'SearchFilterService', 'BookmarksService', function($rootScope, SearchFilterService, BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/search-filter/search-filter.html',
        link: function(scope) {
            scope.tagFilters = [];

            scope.addTag = function(tag) {
                SearchFilterService.addFilter(tag);
            };

            scope.removeTag = function(tag) {
                SearchFilterService.removeFilter(tag);
            };

            scope.loadAutoCompleteSuggestions = function(query) {
                return BookmarksService.searchTags(query);
            };

            var searchFilterRemoveTagWatcher = $rootScope.$on('search-filter.remove-tag', function(event, data) {
                scope.tagFilters = angular.copy(data);
            });

            scope.$on('$destroy', function() {
                searchFilterRemoveTagWatcher();
            });
        }
    };
}]);