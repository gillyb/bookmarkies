angular.module('bookmarkies').directive('savedSearches', ['$rootScope', '$http', 'SearchFilterService', function($rootScope, $http, SearchFilterService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/saved-searches/saved-searches.html',
        link: function(scope) {
            var loadSavedSearches = function() {
                SearchFilterService.getSavedSearches().then(function(savedSearches) {
                    scope.savedSearches = savedSearches;
                });
            };
            loadSavedSearches();

            scope.deleteSearch = function(savedSearchId) {
                $http.delete('/search/' + savedSearchId).then(function(res) {
                    scope.savedSearches = _.filter(scope.savedSearches, function(s) { return s._id != savedSearchId; });
                }).catch(function() {
                    // todo: display a nicer error message
                    alert('There was an error deleting this saved search');
                });
            };

            $rootScope.$on('saved-searches:updated', loadSavedSearches);
        }
    };
}]);