angular.module('bookmarkies').controller('HomeController', ['$scope', '$http', function($scope, $http) {

    $scope.displaySearch = true;
    $scope.displayAdd = false;

    $scope.showSearch = function() {
        $scope.displayAdd = false;
        $scope.displaySearch = true;
    };
    $scope.showAdd = function() {
        $scope.displaySearch = false;
        $scope.displayAdd = true;
    };

    $scope.newBookmark = { url:'', title:'', tags:'' };
    $scope.addBookmark = function() {
        $http.put('/bookmark', $scope.newBookmark).success(function(res) {

        }).catch(function(ex) {

        });
    };

}]);