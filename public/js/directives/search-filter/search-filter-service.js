angular.module('bookmarkies').service('SearchFilterService', [function() {

    var filters = [];

    var _getFilters = function() {
        return filters;
    };

    var _addFilter = function(tag) {
        if (filters.indexOf(tag) >= 0)
            return;
        filters.push(tag);
    };

    var _removeFilter = function(tag) {
        if (filters.indexOf(tag) < 0)
            return;
        filters = _.filter(filters, function(t) { return t != tag; });
    };

    return {
        getFilters: _getFilters,
        addFilter: _addFilter,
        removeFilter: _removeFilter
    };

}]);