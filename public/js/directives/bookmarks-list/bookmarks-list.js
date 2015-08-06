angular.module('bookmarkies').directive('bookmarksList', ['BookmarksService', function(BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmarks-list/bookmarks-list.html',
        link: function($scope) {
            $scope.bookmarks = [];
            $scope.allBookmarks = [];
            BookmarksService.get().then(function(res) {
                $scope.bookmarks = _.clone(res);
                $scope.allBookmarks = _.clone(res);
            });

            $scope.$on('search-filter.add-tag', function(event, data) {
                $scope.bookmarks = _.filter($scope.bookmarks, function(b) {
                    return _.pluck(b.tags, 'text').indexOf(data.text) >= 0;
                });
            });
            $scope.$on('search-filter.remove-tag', function(event, data) {
                $scope.bookmarks = $scope.bookmarks.concat(
                    _.filter($scope.allBookmarks, function(b) {
                        return _.pluck(b.tags, 'text').indexOf(data.text) < 0;
                    })
                );
            });

            $scope.delete = function(id) {
                BookmarksService.remove(id);
            };
        }
    };
}]);