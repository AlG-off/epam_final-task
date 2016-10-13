app.controller('MainCtrl', ['$scope','$state','AuthService',
    function($scope, $state, AuthService){
        $scope.tempStore = {
            selectedCourse: {}
        };
        $scope.signout = function() {
            AuthService.identity();
            $state.go('login');
        };
}]);