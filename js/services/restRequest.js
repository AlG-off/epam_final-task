app.service("restRequest", ["$http", "$q", function($http, $q) {
    this.getData = function(request, data){
        var deferred = $q.defer(),
            url = "http://localhost:3000/",
            config = null;
        switch(request){
            case "courses":
                config = {
                  method: "GET",
                  url: url + 'coursesList'
                };
            break;
            case "authors":
                config = {
                    method: "GET",
                    url: url + 'authors'
                };
                break;
            case "del":
                config = {
                    method: "DELETE",
                    url: url +'coursesList/'+ data
                };
            break;
            case "add":
                config ={
                    method: "POST",
                    url: url + 'coursesList',
                    data: data
                }
            break;
        }
        $http(config).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(data, status) {
            console.log(status);
        });

        return deferred.promise;
    }
}]);