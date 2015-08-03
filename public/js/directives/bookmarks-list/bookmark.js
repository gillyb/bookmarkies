angular.module('bookmarkies').directive('bookmark', ['BookmarksService', function(BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmarks-list/bookmark.html',
        scope: {
            bookmark: '='
        },
        link: function(scope, element, attrs) {
            scope.initialBookmark = _.clone(scope.bookmark);

            scope.edit = function() {
                scope.bookmark.editing = true;
            };
            scope.cancel = function() {
                scope.bookmark = _.clone(scope.initialBookmark);
                scope.bookmark.editing = false;
            };
            scope.save = function() {
                BookmarksService.update(scope.bookmark).then(function() {
                    scope.bookmark.editing = false;
                });
            };
            scope.delete = function() {
                BookmarksService.remove(scope.bookmark._id);
            };
        }
    };
}]);