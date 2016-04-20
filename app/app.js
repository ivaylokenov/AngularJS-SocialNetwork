'use strict';

angular.module('socialNetwork', [
        'ngRoute',
        'ngCookies',
        'socialNetwork.common',
        'socialNetwork.common.footer',
        'socialNetwork.common.validation',
        'socialNetwork.common.datepicker',
        'socialNetwork.home',
        'socialNetwork.newsFeed',
        'socialNetwork.users.identity'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });
        
        authentication.refreshCookie();
    }])
    .constant('jQuery', $)
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');
