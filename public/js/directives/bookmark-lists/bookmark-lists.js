angular.module('bookmarkies').directive('bookmarkLists', ['$state', 'BookmarkListsService', function($state, BookmarkListsService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmark-lists/bookmark-lists.html',
        link: function(scope, element) {
            scope.creatingList = false;

            var loadLists = function() {
                BookmarkListsService.get().then(function(lists) {
                    scope.bookmarkLists = lists;
                });
            };
            loadLists();

            scope.createList = function() {
                scope.creatingList = true;
                scope.newListName = '';
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
        }
    };
}]);