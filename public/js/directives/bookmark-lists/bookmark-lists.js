angular.module('bookmarkies').directive('bookmarkLists', [function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmark-lists/bookmark-lists.html',
        link: function(scope) {
            scope.creatingList = false;

            scope.createList = function() {
                scope.creatingList = true;
            };
            scope.cancelCreate = function() {
                scope.creatingList = false;
                scope.newListName = '';
            };

            scope.saveNewList = function() {

            };
            scope.goToList = function() {

            };
        }
    };
}]);