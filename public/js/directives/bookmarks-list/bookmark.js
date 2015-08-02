angular.module('bookmarkies').directive('bookmark', [function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/bookmarks-list/bookmark.html',
        scope: {
            bookmark: '='
        },
        link: function(scope, element, attrs) {

        }
    };
}]);