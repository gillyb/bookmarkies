angular.module('bookmarkies').service('BookmarksService', ['$window', '$http', '$q', 'CacheService', function($window, $http, $q, CacheService) {

    this.bookmarks = [];
    this.tags = [];

    var _getTags = function() {
        var tags = [];
        _.forEach(this.bookmarks, function(b) {
            tags.concat(b.tags);
        });
        this.tags = _.compact(tags);
        return this.tags;
    };
    var _addTags = function(tags) {
        this.tags.concat(tags);
        this.tags = _.compact(tags);
    };

    var _get = function() {
        return CacheService.get('bookmarks', function() {
            return $http.get('/bookmarks').then(function(res) {
                this.bookmarks = res.data;
                return this.bookmarks;
            });
        });
    };

    var _add = function(bookmark) {
        var deferred = $q.defer();
        $http.put('/bookmark', bookmark).success(function(res) {
            this.bookmarks.push(res);
            CacheService.update('bookmarks', this.bookmarks);
            if (res.tags && res.tags.length) _addTags(res.tags);
            deferred.resolve(res);
        });
        return deferred.promise;
    };

    var _update = function(bookmark) {
        var d = $q.defer();
        $http.post('/bookmark/' + bookmark._id, bookmark).success(function(res) {
            this.bookmarks = _.map(this.bookmarks, function(b) {
                return (b._id === bookmark._id) ? res : b;
            });
            CacheService.update('bookmarks', this.bookmarks);
            d.resolve();
        });
        return d.promise;
    };

    var _remove = function(bookmarkId) {
        var d = $q.defer();
        return $http.delete('/bookmark/' + bookmarkId).success(function() {
            _.remove(this.bookmarks, function(b) { return b._id == bookmarkId; });
            CacheService.update('bookmarks', this.bookmarks);
            d.resolve();
        });
        return d.promise;
    };

    return {
        get: _get,
        add: _add,
        update: _update,
        remove: _remove,
        getTags: _getTags
    };

}]);