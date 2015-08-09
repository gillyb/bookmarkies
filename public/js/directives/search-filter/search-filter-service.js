angular.module('bookmarkies').service('SearchFilterService', [function() {

    this.filters = [];

    var _getFilters = function() {
        return this.filters;
    };

    var _addFilter = function(tag) {
        if (this.filters.indexOf(tag) >= 0)
            return;
        this.filters.push(tag);
    };

    var _removeFilter = function(tag) {
        if (this.filters.indexOf(tag) < 0)
            return;
        this.filters = _.filter(this.filters, function(t) { return t != tag; });
    };

    return {
        getFilters: _getFilters,
        addFilter: _addFilter,
        removeFilter: _removeFilter
    };

}]);