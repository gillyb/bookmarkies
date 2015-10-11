angular.module('bookmarkies').controller('HomeController', ['$scope', '$http', '$window', '$cookies', '$location', 'BookmarksService', function($scope, $http, $window, $cookies, $location, BookmarksService) {

    $scope.displaySearch = false;
    $scope.displayAdd = true;

    $scope.showSearch = function() {
        $scope.displayAdd = false;
        $scope.displaySearch = true;
    };
    $scope.showAdd = function() {
        $scope.displaySearch = false;
        $scope.displayAdd = true;
    };

    $scope.newBookmark = { url:'', name:'', tags:'' };
    $scope.addBookmark = function() {
        var toSave = _.clone($scope.newBookmark);
        toSave.tags = _.pluck($scope.newBookmark.tags, 'text');

        BookmarksService.savedAlready(toSave.url).then(function(bookmarkSaved) {
            if (bookmarkSaved) {
                alert('This url is already saved in your bookmarks');
                return;
            }

            BookmarksService.add(toSave).then(function() {
                $scope.newBookmark = { url:'', name:'', tags:'' };
                document.getElementById('url').focus();
            });
        });
    };

    $scope.logout = function() {
        $window.sessionStorage.clear();
        $window.localStorage.clear();
        $window.location.href = '/logout';
    };

    $scope.goHome = function() {
        $location.path('/');
    };

    $scope.loadAutoCompleteSuggestions = function(query) {
        return BookmarksService.searchTags(query);
    };

}]);