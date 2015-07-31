angular.module('bookmarkies').controller('HomeController', ['$scope', '$http', 'BookmarksService', function($scope, $http, BookmarksService) {

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
        var toSave = _.clone($scope.newBookmark);
        toSave.tags = _.pluck($scope.newBookmark.tags, 'text');
        BookmarksService.add(toSave).then(function() {
            $scope.newBookmark = { url:'', title:'', tags:'' };
        });
    };

}]);