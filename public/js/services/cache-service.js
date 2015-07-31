angular.module('bookmarkies').service('CacheService', ['$q', '$window', function($q, $window) {

    var cachePrefix = 'bookmarkiesCache.';

    var _set = function(key, value, secondsToLive) {
        if (!$window.sessionStorage)
            return;

        var cacheObject = {
            value: angular.fromJson(value),
            exp: parseInt((Date.now() / 1000) + secondsToLive)
        };
        var cacheKey = cachePrefix + key;
        $window.sessionStorage.setItem(cacheKey, angular.toJson(cacheObject));
    };

    var get = function(key, getterFunc, secondsToLive) {
        var d = $q.defer();
        var secondsToLive = secondsToLive || 60 * 60; // default to 60min

        var cacheKey = cachePrefix + key;
        var value = $window.sessionStorage.getItem(cacheKey);

        if (typeof value == 'string') {
            var valObj = angular.fromJson(value);
            if (valObj && typeof valObj == 'object' && valObj.exp && valObj.exp >= (Date.now() / 1000)) {
                d.resolve(angular.fromJson(valObj.value));
                return d.promise;
            }
        }

        // if we got a regular function as a getterFunc
        if (typeof getterFunc == 'function') {
            var getResponse = getterFunc();
            if (typeof getResponse == 'object' && getResponse.then && typeof getResponse.then == 'function') {
                getResponse.then(function (g) {
                    _set(key, g, secondsToLive);
                    d.resolve(g);
                });
                return d.promise;
            }

            _set(key, getResponse, secondsToLive);
            d.resolve(getResponse);
            return d.promise;
        }

        // if we got a promise as a getterFunc
        if (typeof getterFunc == 'object' && getterFunc.then && typeof getterFunc.then == 'function') {
            getterFunc.then(function(getResponse) {
                _set(key, getResponse, secondsToLive);
                d.resolve(getResponse);
            });
            return d.promise;
        }
    };

    var update = function(key, updatedValue) {
        var currentValue = angular.fromJson($window.sessionStorage.getItem(cachePrefix + key));
        currentValue.value = updatedValue;
        $window.sessionStorage.setItem(cachePrefix + key, angular.toJson(currentValue));
    };

    var clear = function(key) {
        var cacheKey = cachePrefix + key;
        $window.sessionStorage.removeItem(cacheKey);
    };

    return {
        get: get,
        update: update,
        clear: clear
    };

}]);