angular.module('bookmarkies').controller('ViewListController', ['$scope', '$state', 'BookmarkListsService', function($scope, $state, BookmarkListsService) {

    $scope.loadingList = true;

    var loadList = function() {
        $scope.loadingList = true;
        $scope.list = {};

        BookmarkListsService.getList($state.params.listId).then(function(list) {
            $scope.loadingList = false;
            $scope.list = list;
        });
    };
    loadList();

    $scope.starringList = false;
    $scope.star = function() {
        if ($scope.starringList) return;
        $scope.starringList = true;

        if (!$scope.list.starred) {
            BookmarkListsService.starList($scope.list._id).then(function () {
                $scope.list.starred = true;
                $scope.starringList = false;
            });
        }
        else {
            BookmarkListsService.unstarList($scope.list._id).then(function () {
                $scope.list.starred = false;
                $scope.starringList = false;
            });
        }
    };

    $scope.goHome = function() {
        $state.go('home');
    };

}]);