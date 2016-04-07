angular.module('socialNetwork.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
        
            var deferred = $q.defer();
        
            var currentUser = undefined;
        
            var accessToken = '0TkKmVeBbt-9inXFujJ_cLNZEDsUVNuXVF-8OUebc1wxj2c0nSefjh14gQSWXtP60qaleWsQe8MK7Iu2EyKrnSQ-4UJRF_tyAPNEjJQrrKrCv3l-zrSP0c3qQ0SOYYT82BSij42eY3TdCsqv4VRdiuV9-9QNjNvK1J6EzYTTRQKlVx6QOp64MOwNjvOUNusvAm9RhQzvLt3VC2WpQ7P84haZPTJCGhXur3LKF-YADtUV_Tsgfhaoj74jt8_dUQbmHOge-LYMoBgGTrhlMBFFC3DvzqxmM8XiOZ8ezTZywkWk9-A-VAfF3WFh0DdO4lnGC5Z2OcKbI_v1BUiGwtpi8242lPI53-ehGEf6XdYPVoJFmCmvWs6p3BE7q1ho7657DVzIv6ExtWo8eQuWsIoJTq_tifgUkav78VW3NllvWocdfyfBt87BRJnMOqEABpOGUvESuT3KKPOcZucuxmIUhHElvoXWx6FFpXGQibCnXeU';
            
            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            
            $http.get(BASE_URL + 'me')
                .then(function(response) {
                    currentUser = response.data;
                    deferred.resolve(currentUser);
                });
            
            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
    }]);