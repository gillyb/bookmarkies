angular.module('bookmarkies').directive('bookmarkLists', ['$state', '$timeout', 'BookmarkListsService', function($state, $timeout, BookmarkListsService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmark-lists/bookmark-lists.html',
        link: function(scope, element) {
            scope.creatingList = false;

            var loadLists = function() {
                BookmarkListsService.get().then(function(lists) {
                    scope.bookmarkLists = lists.sort(function(a, b) {
                        if ((a.starred && b.starred) || (!a.starred && !b.starred)) return 0;
                        if (b.starred) return 1;
                        return -1;
                    });
                });
            };
            loadLists();

            scope.createList = function() {
                scope.creatingList = true;
                scope.newListName = '';
                $timeout(function() {
                    element.find('input')[0].focus();
                }, 150);
            };
            scope.cancelCreate = function() {
                scope.creatingList = false;
                scope.newListName = '';
            };

            scope.saveNewList = function() {
                if (scope.newListName.trim() == '') return;
                if (scope.savingNewList) return;
                scope.savingNewList = true;
                BookmarkListsService.createList(scope.newListName).then(function() {
                    scope.savingNewList = false;
                    scope.creatingList = false;
                    loadLists();
                });
            };
            scope.goToList = function(listId, listName) {
                $state.go('list', {
                    listId: listId,
                    listName: listName
                });
            };

            scope.starringList = false;
            scope.starList = function(listId) {
                scope.starringList = true;
                BookmarkListsService.starList(listId).then(function() {
                    scope.starringList = false;
                    loadLists();
                });
            };
            scope.unstarList = function(listId) {
                scope.starringList = true;
                BookmarkListsService.unstarList(listId).then(function() {
                    scope.starringList = false;
                    loadLists();
                });
            };

            scope.deleteList = function(listId) {
                if (!window.confirm('Are you sure you want to delete this list?'))
                    return;
                BookmarkListsService.deleteList(listId).then(loadLists);
            };
        }
    };
}]);