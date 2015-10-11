angular.module('bookmarkies').directive('bookmark', ['$window', 'BookmarksService', function($window, BookmarksService) {
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
                if (!confirm('Are you sure you want to delete this bookmark ?'))
                    return;
                BookmarksService.remove(scope.bookmark._id);
            };

            var _normalizeUrl = function(url) {
                if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0)
                    return 'http://' + url;
                return url;
            };

            scope.goTo = function(url) {
                window.location.href = _normalizeUrl(url);
            };
            scope.externalGoTo = function(url) {
                window.open(_normalizeUrl(url));
            };
        }
    };
}]);