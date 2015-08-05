angular.module('bookmarkies').directive('tagsList', ['BookmarksService', function(BookmarksService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/tags-list/tags-list.html',
        link: function(scope) {
            BookmarksService.get().then(function(res) {
                var tags = [];
                _.forEach(res, function(b) {
                    tags = tags.concat(b.tags);
                });
                scope.tags = _.compact(tags);
            });
        }
    };
}]);