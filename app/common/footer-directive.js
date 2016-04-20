angular.module('socialNetwork.common.footer', [])
    .directive('footer', [function() {
        return {
            restrict: 'A',
            templateUrl: 'app/common/footer-directive.html',
            link: function (scope, element) {
                
            }
        };
    }]);
    