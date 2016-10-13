app.factory('AuthService', ['$rootScope', '$state',
    function($rootScope, $state) {
        var user = {
                name: 'Test',
                pass: '123'
            },
            _authenticated = false;

        return {
            checkAccess: checkAccess,
            identity: identity
        };
        function checkAccess(event, toState) {
            var userLocal = angular.fromJson(localStorage.getItem("app.identity"));
            identity(userLocal);
            if (toState.name != 'login' && !_authenticated) {
                event.preventDefault();
                $state.go('login');
            }
        }
        function identity(value) {
            if(value){
                if(value.name === user.name && value.pass === user.pass) {
                    $rootScope.user = value;
                    localStorage.setItem("app.identity", angular.toJson(value))
                    return _authenticated = true;
                }
            }
            $rootScope.user = null;
            localStorage.removeItem("app.identity")
            return _authenticated = false;
        }
    }
]);