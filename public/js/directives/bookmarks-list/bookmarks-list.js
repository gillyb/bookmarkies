angular.module('bookmarkies').directive('bookmarksList', ['BookmarksService', function(BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmarks-list/bookmarks-list.html',
        link: function($scope) {
            $scope.bookmarks = [];
            BookmarksService.get().then(function(res) {
                $scope.bookmarks = res;
            });

            $scope.$on('search-filter.add-tag', function(event, data) {
                // TODO: filter search
            });
            $scope.$on('search-filter.remove-tag', function(event, data) {
                // TODO: filter search
            });

            $scope.delete = function(id) {
                BookmarksService.remove(id);
            };
        }
    };
}]);