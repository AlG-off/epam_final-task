app.factory('dataService', ['restRequest', '$q',
    function(restRequest, $q){
        var service = {
                getCourses: getCourses,
                getAuthors: getAuthors,
                saveCourse: saveCourse,
                setArchived :setArchived,
                unarchived:unarchived,
                delCourse: delCourse
            };

        return service;

        function getCourses(){
            return restRequest.getData('courses');

        }
        function getAuthors() {
            return restRequest.getData('authors');
        }
        function saveCourse(data){
            restRequest.getData('add', data)
        }
        function delCourse(id){
            restRequest.getData('del', id)
        }
        function setArchived(data){
            var arrFunc =[];
            data.forEach(function(item) {
                arrFunc.push(restRequest.getData('add', item));
            });
            return $q.all(arrFunc)
                .then(function(data) {
                    return data;
                });
        }
        function unarchived(data){
            restRequest.getData('add', data)
        }
    }
]);
