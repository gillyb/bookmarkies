angular.module('bookmarkies').directive('bookmarksList', ['$rootScope', 'BookmarksService', 'SearchFilterService', function($rootScope, BookmarksService, SearchFilterService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmarks-list/bookmarks-list.html',
        link: function($scope) {
            $scope.bookmarks = [];
            $scope.filters = [];

            var loadBookmarks = function() {
                BookmarksService.get().then(function(res) {
                    $scope.bookmarks = _.clone(res);
                });
            };

            loadBookmarks();

            $rootScope.$on('bookmarks-list:updated', loadBookmarks);

            var filterBookmarksList = function(filters) {
                _.forEach($scope.bookmarks, function(b) {
                    b.filteredOut = _.intersection(_.pluck(b.tags, 'text'), filters).length != filters.length;
                });
            };

            $rootScope.$on('search-filter.add-tag', function(event, data) {
                $scope.filters = data;
                filterBookmarksList(data);
            });
            $rootScope.$on('search-filter.remove-tag', function(event, data) {
                $scope.filters = data;
                filterBookmarksList(data);
            });

            $scope.delete = BookmarksService.remove;

            $scope.saveSearch = function() {
                SearchFilterService.saveSearch();
            };
        }
    };
}]);