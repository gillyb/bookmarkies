angular.module('bookmarkies').service('BookmarksService', ['$rootScope', '$http', '$q', '$timeout', function($rootScope, $http, $q, $timeout) {

    this.bookmarks = null;

    this.get = function() {
        var d = $q.defer();

        if (this.bookmarks) {
            d.resolve(this.bookmarks);
            return;
        }

        $http.get('/bookmarks').then(function(res) {
            this.bookmarks = res.data;

            $timeout(function() {
                this.bookmarks = null;
            }, 1000 * 60 * 4);  // cache for 4 minutes

            d.resolve(this.bookmarks);
        });

        return d.promise;
    };

    this.savedAlready = function(url) {
        var d = $q.defer();
        this.get().then(function(bookmarks) {
            for (var i=0; i<bookmarks.length; i++) {
                if (bookmarks[i].url.toLowerCase().replace('http://', '').replace('https://', '').trim() == url.trim()) {
                    d.resolve(true);
                    return;
                }
            }
            d.resolve(false);
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
        var d = $q.defer();
        var tags = [];
        this.get().then(function(bookmarks) {
            _.forEach(bookmarks, function(b) {
                tags = tags.concat(b.tags);
            });
            tags = _.unique(tags);
            d.resolve(tags);
        });
        return d.promise;
    };

    var cache = _.memoize(function(pattern) {
        return new RegExp(pattern.split("").reduce(function(a,b){
            return a+'[^'+b+']*'+b;
        }));
    });
    var testStringFuzziness = function(str, pattern) {
        return cache(pattern).test(str);
    };

    this.searchTags = function(query) {
        var d = $q.defer();

        this.getTags().then(function(tagsList) {
            d.resolve(_.filter(tagsList, function(tag) {
                return testStringFuzziness(tag, query);
            }));
        });

        return d.promise;
    };

}]);