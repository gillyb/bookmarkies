angular.module('bookmarkies').service('BookmarksService', ['$window', '$http', 'CacheService', function($window, $http, CacheService) {

    var bookmarks = CacheService.get('bookmarks', function() {
        return $http.get('/bookmarks');
    });

    var _get = function() {
        return bookmarks;
    };

    var _add = function(bookmark) {
        $http.put('/bookmark', bookmark).success(function(res) {
            bookmarks.push(res);
        });
    };

    var _remove = function(bookmarkId) {
        // TODO: implement
    };

    return {
        get: _get,
        add: _add,
        remove: _remove
    };

}]);