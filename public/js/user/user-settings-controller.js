angular.module('bookmarkies').controller('UserSettingsController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    ga('send', 'event', 'user-settings', 'open');

    UserService.getUser().then(function(user) {
        $scope.user = user;
    });

    $scope.logout = function() {
        if (!confirm('Are you sure you want to logout ?')) return;

        ga('send', 'event', 'user-settings', 'logout');

        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = '/logout';
    };

    $scope.closeAccount = function() {
        if (!confirm('All your data will be deleted.\nAre you sure you want to proceed ?')) return;
        ga('send', 'event', 'user-settings', 'close-account');
        UserService.closeAccount(user.email);
    };

    $scope.goHome = function() {
        $location.path('/');
    };

}]);