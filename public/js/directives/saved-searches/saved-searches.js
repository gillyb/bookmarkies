angular.module('bookmarkies').directive('savedSearches', ['$rootScope', '$window', '$http', 'SearchFilterService', function($rootScope, $window, $http, SearchFilterService) {
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
                if (!$window.confirm('Are you sure you want to delete this saved search ?'))
                    return;

                $http.delete('/search/' + savedSearchId).then(function() {
                    scope.savedSearches = _.filter(scope.savedSearches, function(s) { return s._id != savedSearchId; });
                }).catch(function() {
                    // todo: display a nicer error message
                    alert('There was an error deleting this saved search');
                });
            };

            var savedSearchesUpdatedWatcher = $rootScope.$on('saved-searches:updated', loadSavedSearches);

            scope.openSavedSearch = function(search) {
                var filters = search.filters;
                SearchFilterService.clearFilters();
                SearchFilterService.addFilters(filters);
            };

            scope.$on('$destroy', function() {
                savedSearchesUpdatedWatcher();
            });
        }
    };
}]);