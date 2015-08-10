angular.module('bookmarkies').service('BookmarksService', ['$rootScope', '$http', '$q', 'CacheService', function($rootScope, $http, $q, CacheService) {

    this.bookmarks = [];
    this.bookmarkPromise = null;

    var _get = function() {
        if (this.bookmarkPromise != null)
            return this.bookmarkPromise;

        this.bookmarkPromise = CacheService.get('bookmarks', function() {
            return $http.get('/bookmarks').then(function(res) {
                this.bookmarkPromise = null;
                this.bookmarks = res.data;
                return this.bookmarks;
            });
        });

        return this.bookmarkPromise;
    };

    var _add = function(bookmark) {
        var deferred = $q.defer();
        $http.put('/bookmark', bookmark).success(function(res) {
            this.bookmarks.push(res);
            CacheService.update('bookmarks', this.bookmarks);
            $rootScope.$broadcast('bookmarks-list:updated');
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
            $rootScope.$broadcast('bookmarks-list:updated');
            d.resolve();
        });
        return d.promise;
    };

    var _remove = function(bookmarkId) {
        var d = $q.defer();
        return $http.delete('/bookmark/' + bookmarkId).success(function() {
            _.remove(this.bookmarks, function(b) { return b._id == bookmarkId; });
            CacheService.update('bookmarks', this.bookmarks);
            $rootScope.$broadcast('bookmarks-list:updated');
            d.resolve();
        });
        return d.promise;
    };

    return {
        get: _get,
        add: _add,
        update: _update,
        remove: _remove
    };

}]);