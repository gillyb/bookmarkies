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
            template: 'js/directives/search-filter/save-search.html',
            controller: ['$scope', '$http', function($scope, $http) {
                $scope.save = function() {
                    // todo: disable button while saving
                    $http.post('/search/save', {}).then(function() {
                        // todo: enable button
                    });
                };
            }],
            showClose: false,
            closeByEscape: true
        });
    };

}]);