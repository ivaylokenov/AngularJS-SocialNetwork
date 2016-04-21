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
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        
        $httpProvider.interceptors.push(['$q','toastr', function($q, toastr) {
            return {
                'responseError': function(rejection) {
                    if (rejection.data && rejection.data['error_description']) {
                        toastr.error(rejection.data['error_description']);
                    }
                    else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']){
                        var errors = rejection.data.modelState[''];
                        if (errors.length > 0) {
                            toastr.error(errors[0]);
                        }
                    }
                    
                    return $q.reject(rejection);
                }
            }
        }]);
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
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');
