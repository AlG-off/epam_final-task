app.controller('EditCtrl', ['$scope', '$state', 'dataService',
    function($scope, $state, dataService) {
        $scope.addCourse = addCourse;
        $scope.cancel = cancel;
        $scope.maskOption={
            maskDefinitions:{'h':/[0-5]/}
        }
        dataService.getAuthors()
            .then( function(data)  {
                $scope.authorsList = data;
            });

        function addCourse(){
            var course = $scope.tempStore.selectedCourse;
            course.isChecked = false;
            course.isArchived = false;
            dataService.saveCourse(course);
            $scope.tempStore.selectedCourse = {};
        }
        function cancel(){
            $scope.tempStore.selectedCourse = {};
            $state.go('items');
        }
    }
]);
