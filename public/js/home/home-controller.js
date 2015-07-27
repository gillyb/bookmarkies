angular.module('bookmarkies').controller('HomeController', ['$http', function($http) {

    $http.post('/logged-in');

}]);