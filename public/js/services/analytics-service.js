angular.module('bookmarkies').service('AnalyticsService', [function() {

    this.event = function(options) {
        console.log('Analytics :: Event');
        try { ga('send', 'event', options.category, options.action, options.label, options.value); }
        catch (err) { }
    };

}]);