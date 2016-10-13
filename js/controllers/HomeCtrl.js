app.controller('HomeCtrl', ['$scope', '$state', 'dataService', '$timeout',
    function($scope, $state, dataService, $timeout) {
        $scope.coursesList = [];
        $scope.allChecked = false;
        $scope.disableBtnArchive = true;

        $scope.activateBtnArchive = activateBtnArchive;
        $scope.chooseAllCourses = chooseAllCourses;
        $scope.setArchivedCourse = setArchivedCourse;
        $scope.unarchiveCourse = unarchiveCourse;
        $scope.addNewCourse = addNewCourse;
        $scope.delCourse = delCourse;
        $scope.editCourse = editCourse;
        $scope.sortCourses = {
            fieldName: undefined,
            reverse : false,
            sort: function (fieldName){
                if(this.fieldName === fieldName){
                    this.reverse = !this.reverse;
                }else{
                    this.fieldName = fieldName;
                    this.reverse = false;
                }
            },
            isSortUp: function (fieldName){
                return this.fieldName === fieldName && !this.reverse;
            },
            isSortDown: function (fieldName){
                return this.fieldName === fieldName && this.reverse;
            }
        };
        _update();
        function _update() {
            dataService.getCourses()
                .then(function (data) {
                    $scope.coursesList = data;
                });
        }

        function editCourse(course) {
             $scope.tempStore.selectedCourse = angular.copy(course);
             $state.go('edit',{id:course.id});
         }

        function addNewCourse(){
             $state.go('add');
         }

        function delCourse(id, index){
             var isDelCourse = confirm("Вы действидельно хотите безвозвратно удалить эту запись?")
             if(!isDelCourse) return;
             dataService.delCourse(id);
             $scope.coursesList.splice(index,1);
         }
        function chooseAllCourses() {
            if ($scope.allChecked) {
                $scope.coursesList.forEach(function(item) {
                    if (item.isArchived) return;
                    item.isChecked = true;
                });
                $scope.disableBtnArchive = false;
            } else {
                $scope.coursesList.forEach(function (item) {
                    if (item.isArchived) return;
                    item.isChecked = false;
                });
                $scope.disableBtnArchive = true;
            }
        }
        function setArchivedCourse(){
            $scope.coursesList.forEach(function(item) {
                if(item.isChecked && !item.isArchived) {
                    item.isArchived = true;
                }
            });
            dataService.setArchived($scope.coursesList)
                .then(function(data){
                    console.log(data);
                    $scope.coursesList = data;
                });
            $scope.disableBtnArchive = true;
        }
        function unarchiveCourse(course){
            course.isArchived = course.isChecked = false;
                dataService.unarchived(course)
        }
        function activateBtnArchive(){
            $scope.disableBtnArchive = false;
        }
    }
]);
