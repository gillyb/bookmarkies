angular.module('bookmarkies').service('UserService', ['$q', '$http', function($q, $http) {

    this.getUser = function() {
        var d = $q.defer();
        $http.get('/user-details').then(function(res) {
            var user = res.data;
            d.resolve(user);
        });
        return d.promise;
    };

    this.closeAccount = function() {
        return $http.get('/close-account');
    };

}]);