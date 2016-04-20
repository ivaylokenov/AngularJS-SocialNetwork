angular.module('socialNetwork.newsFeed', [
        'socialNetwork.newsFeed.feed'
    ])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function($q, authentication) {
                if (authentication.isAuthenticated()) {
                    return $q.when(true);
                }
                
                return $q.reject('Unauthorized Access');
            }]
        }
        
        $routeProvider.when('/newsFeed', {
            templateUrl: 'app/news-feed/news-feed.html',
            controller: 'NewsFeedCtrl',
            resolve: routeChecks.authenticated
        })
    }])
    .controller('NewsFeedCtrl', [
        '$scope',
        'feed',
        function($scope, feed) {
        
        feed.latest()
            .then(function(latestFeed) {
                $scope.latestFeed = latestFeed;
            });
    }]);