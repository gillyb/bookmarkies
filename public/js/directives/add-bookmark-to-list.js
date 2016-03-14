angular.module('bookmarkies').directive('addBookmarkToList', ['$timeout', 'BookmarkListsService', function($timeout, BookmarkListsService) {

    return {
        restrict: 'E',
        template: '<div class="add-to-list-wrapper">' +
                    '<div class="add-to-list" ng-mouseenter="mouseOver()" ng-mouseleave="mouseOut()" ng-click="openListsMenu()" add-bookmark-to-list>' +
                        '<i class="fa fa-plus-square"></i>' +
                            'Add to list' +
                    '</div>' +
                    '<div class="bookmark-lists-menu" ng-mouseenter="mouseOver()" ng-mouseleave="mouseOut()" ng-show="showLists">' +
                        '<div class="bookmark-list" ng-click="addToList(list._id)" ng-repeat="list in lists" ng-class="{\'adding\':list._id==addingToList}">{{list.name}}</div>' +
                    '</div>' +
                  '</div>',
        scope: {
            bookmarkId: '='
        },
        link: function(scope, element, attrs) {
            scope.showLists = false;

            scope.openListsMenu = function() {
                scope.showLists = true;
                BookmarkListsService.get().then(function(lists) {
                    scope.lists = lists;
                });
            };

            var mouseOutTimeout = undefined;
            scope.mouseOut = function() {
                mouseOutTimeout = $timeout(function() {
                    scope.showLists = false;
                }, 750);
            };
            scope.mouseOver = function() {
                if (mouseOutTimeout)
                    $timeout.cancel(mouseOutTimeout);
            };

            scope.addToList = function(listId) {
                if (scope.addingToList == listId)
                    return;

                scope.addingToList = listId;
                BookmarkListsService.addBookmark(listId, scope.bookmarkId).then(function() {
                    scope.addingToList = undefined;
                });
            };

        }
     };

}]);