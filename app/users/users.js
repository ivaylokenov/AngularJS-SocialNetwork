angular.module('myApp.users', ['myApp.filters.capitalize'])
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'app/users/users.html',
            controller: 'UsersController',
        })
    }])
    
    .factory('repos', ['$http', '$q', function($http, $q) {
        
        function getRepositories(username) {
            var deferred = $q.defer();
            
            $http.get('https://api.github.com/users/' + username + '/repos')
                .then(function (result) {
                    deferred.resolve(result.data);
                }, function (err) {
                    deferred.reject(err);
                })
            
            return deferred.promise;
        }
        
        return {
            getRepositories: getRepositories
        }
    }])
    
    .controller('UsersController', [
        '$scope', 'repos',
        function UsersController($scope, repos) {
            
            repos.getRepositories('ivaylokenov')
                .then(function(repositories) {
                    $scope.repos = repositories;
                })
            
        }]);