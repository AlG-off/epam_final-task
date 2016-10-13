app.controller('LoginCtrl', ['$scope', '$state', 'AuthService',
    function($scope, $state, AuthService) {
        var vm = this;
        vm.authState = false;
        vm.user = {};

        $scope.signin = function() {
           vm.authState = !AuthService.identity(vm.user);
           $state.go('items');
        };
    }
]);