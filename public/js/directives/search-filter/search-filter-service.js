angular.module('bookmarkies').service('SearchFilterService', ['$rootScope', '$q', '$http', 'ngDialog', function($rootScope, $q, $http, ngDialog) {

    var self = this;

    this.filters = [];

    this.addFilter = function(tag) {
        if (this.filters.indexOf(tag.text) >= 0)
            return;
        this.filters.push(tag.text);
        $rootScope.$emit('search-filter.add-tag', this.filters);
    };

    this.removeFilter = function(tag) {
        if (this.filters.indexOf(tag.text) < 0)
            return;
        this.filters = _.filter(this.filters, function(t) { return t != tag.text; });
        $rootScope.$emit('search-filter.remove-tag', this.filters);
    };

    this.getSavedSearches = function() {
        var d = $q.defer();
        $http.get('/search/all').then(function(res) {
            d.resolve(res.data);
        });
        return d.promise;
    };

    this.saveSearch = function() {
        ngDialog.open({
            template: 'js/directives/search-filter/save-search-dialog.html',
            controller: ['$rootScope', '$scope', '$http', 'SearchFilterService', function($rootScope, $scope, $http, SearchFilterService) {
                $scope.filters = SearchFilterService.filters;
                $scope.save = function() {
                    if ($scope.savingSearch) return;
                    $scope.savingSearch = true;
                    $http.post('/search/save', {
                        name: $scope.searchName,
                        filters: this.filters
                    }).then(function() {
                        $rootScope.$emit('saved-searches:updated');
                        $scope.closeThisDialog();
                    }).catch(function() {
                        // todo: create a nicer error message
                        alert('There was an error saving this search.');
                    }).finally(function() {
                        $scope.savingSearch = false;
                    });
                };
            }],
            showClose: false,
            closeByEscape: true
        });
    };

    this.clearFilters = function() {
        _.forEach(this.filters, function(filter) {
            this.removeFilter(filter);
        });
    };
    this.addFilters = function(filters) {
        _.forEach(filters, function(filter) {
            self.addFilter({ text: filter });
        });
    };

}]);