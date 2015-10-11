angular.module('bookmarkies').controller('UserSettingsController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    UserService.getUser().then(function(user) {
        $scope.user = user;
    });

    $scope.logout = function() {
        if (!confirm('Are you sure you want to logout ?')) return;
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = '/logout';
    };

    $scope.closeAccount = function() {
        if (!confirm('All your data will be deleted.\nAre you sure you want to proceed ?')) return;
        UserService.closeAccount(user.email);
    };

    $scope.goHome = function() {
        $location.path('/');
    };

}]);