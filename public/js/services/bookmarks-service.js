angular.module('bookmarkies').service('BookmarksService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    this.bookmarks = null;

    this.get = function() {
        var d = $q.defer();

        $http.get('/bookmarks').then(function(res) {
            d.resolve(res.data);
        });

        return d.promise;
    };

    this.add = function(bookmark) {
        var deferred = $q.defer();
        var self = this;
        $http.put('/bookmark', bookmark).success(function(res) {
            self.get().then(function(bookmarks) {
                $rootScope.$emit('bookmarks-list:updated');
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    };

    this.update = function(bookmark) {
        var d = $q.defer();
        var self = this;
        $http.post('/bookmark/' + bookmark._id, bookmark).success(function(res) {
            self.get().then(function(bookmarks) {
                bookmarks = _.map(bookmarks, function(b) {
                    return (b._id === bookmark._id) ? res : b;
                });
                $rootScope.$emit('bookmarks-list:updated');
                d.resolve();
            });
        });
        return d.promise;
    };

    this.remove = function(bookmarkId) {
        var d = $q.defer();
        var self = this;
        return $http.delete('/bookmark/' + bookmarkId).success(function() {
            self.get().then(function(bookmarks) {
                _.remove(bookmarks, function(b) { return b._id == bookmarkId; });
                $rootScope.$emit('bookmarks-list:updated');
                d.resolve();
            });
        });
        return d.promise;
    };

    this.getTags = function() {

    };

}]);