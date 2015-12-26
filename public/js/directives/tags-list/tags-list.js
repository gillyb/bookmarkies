angular.module('bookmarkies').directive('tagsList', ['$rootScope', 'BookmarksService', function($rootScope, BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tags-list/tags-list.html',
        link: function(scope) {
            var loadTags = function() {
                BookmarksService.get().then(function(res) {
                    var tags = [];
                    _.forEach(res, function(b) {
                        tags = tags.concat(b.tags);
                    });
                    scope.tags = _.union(_.compact(tags));
                });
            };
            loadTags();

            var bookmarkListUpdatedWatcher = $rootScope.$on('bookmarks-list:updated', loadTags);

            scope.$on('$destroy', function() {
                bookmarkListUpdatedWatcher();
            });
        }
    };
}]);