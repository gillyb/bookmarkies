angular.module('bookmarkies').service('SearchFilterService', ['$rootScope', 'ngDialog', function($rootScope, ngDialog) {

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

    this.saveSearch = function() {
        ngDialog.open({
            template: 'js/directives/search-filter/save-search-dialog.html',
            controller: ['$scope', '$http', 'SearchFilterService', function($scope, $http, SearchFilterService) {
                $scope.filters = SearchFilterService.filters;
                $scope.save = function() {
                    if ($scope.savingSearch) return;
                    $scope.savingSearch = true;
                    $http.post('/search/save', { filters: this.filters }).then(function() {
                        // todo: show saved search in right side column
                        $scope.closeThisDialog();
                    }).catch(function() {
                        // todo: display error message
                    }).finally(function() {
                        $scope.savingSearch = false;
                    });
                };
            }],
            showClose: false,
            closeByEscape: true
        });
    };

}]);