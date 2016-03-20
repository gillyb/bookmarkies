angular.module('bookmarkies').directive('savedSearches', ['$rootScope', '$state', '$window', '$http', 'SearchFilterService', function($rootScope, $state, $window, $http, SearchFilterService) {
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
                // make sure we're on the right page
                if ($state.current.name != 'home') {
                    $window.localStorage.setItem('saved-search', angular.toJson(search));
                    $state.go('home');

                    (function(se) {
                        setTimeout(function() {
                            $rootScope.$apply(function() {
                                SearchFilterService.clearFilters();
                                SearchFilterService.addFilters(se.filters);
                            });
                        }, 100);
                    })(search);
                    return;
                }

                SearchFilterService.clearFilters();
                SearchFilterService.addFilters(search.filters);
            };

            scope.$on('$destroy', function() {
                savedSearchesUpdatedWatcher();
            });
        }
    };
}]);