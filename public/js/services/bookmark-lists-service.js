angular.module('bookmarkies').service('BookmarkListsService', ['$rootScope', '$http', '$q', '$timeout', function($rootScope, $http, $q, $timeout) {

    this.get = function() {
        ga('send', 'event', 'bookmark-lists', 'get-all');
        return $http.get('/lists').then(function(res) {
            return res.data;
        }).catch(function() {
            ga('send', 'event', 'bookmark-lists', 'get-all-error');
        });
    };

    this.getList = function(listId) {
        ga('send', 'event', 'bookmark-lists', 'get-list');
        return $http.get('/list/' + listId).then(function(res) {
            return res.data;
        }).catch(function() {
            ga('send', 'event', 'bookmark-lists', 'get-list-error');
        });
    };

    this.createList = function(name) {
        ga('send', 'event', 'bookmark-lists', 'create-list');
        return $http.post('/list', { name: name });
    };

    this.addBookmark = function(listId, bookmarkId) {
        ga('send', 'event', 'bookmark-lists', 'add-bookmark');
        return $http.post('/list/' + listId + '/add-bookmark', { bookmarkId: bookmarkId });
    };

    this.starList = function(listId) {
        ga('send', 'event', 'bookmark-lists', 'star-list');
        return $http.post('/list/' + listId + '/star');
    };
    this.unstarList = function(listId) {
        ga('send', 'event', 'bookmark-lists', 'unstar-list');
        return $http.post('/list/' + listId + '/unstar');
    };

    this.deleteList = function(listId) {
        ga('send', 'event', 'bookmark-lists', 'delete');
        return $http.delete('/list/' + listId);
    }

}]);