angular.module('bookmarkies').directive('bookmarkLists', ['$state', 'BookmarkListsService', function($state, BookmarkListsService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmark-lists/bookmark-lists.html',
        link: function(scope) {
            scope.creatingList = false;

            BookmarkListsService.get().then(function(lists) {
                scope.bookmarkLists = lists;
            });

            scope.createList = function() {
                scope.creatingList = true;
            };
            scope.cancelCreate = function() {
                scope.creatingList = false;
                scope.newListName = '';
            };

            scope.saveNewList = function() {
                if (scope.savingNewList) return;
                scope.savingNewList = true;
                BookmarkListsService.createList(scope.newListName).then(function() {
                    scope.savingNewList = false;
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