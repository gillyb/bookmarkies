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

}]);