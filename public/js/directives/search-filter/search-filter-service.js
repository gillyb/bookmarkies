angular.module('bookmarkies').service('SearchFilterService', ['$rootScope', function($rootScope) {

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

}]);