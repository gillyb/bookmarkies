angular.module('bookmarkies').service('BookmarkListsService', ['$rootScope', '$http', '$q', '$timeout', function($rootScope, $http, $q, $timeout) {

    this.get = function() {
        return $http.get('/lists').then(function(res) {
            return res.data;
        });
    };

    this.createList = function(name) {
        return $http.post('/list', { name: name });
    };

    this.addBookmark = function(listId, bookmarkId) {
        return $http.post('/list/' + listId + '/add-bookmark', { bookmarkId: bookmarkId });
    };

}]);