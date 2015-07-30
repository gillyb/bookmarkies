angular.module('bookmarkies').directive('bookmarksList', [function() {
    return {
        restrict: 'E',
        templateUrl: '',
        require: '^bookmarksSearchFilter',
        link: function(scope, element, attrs, searchFilter) {

        }
    };
}]);