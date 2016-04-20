angular.module('socialNetwork.common.datepicker', [])
    .directive('datePicker', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var minDate = attrs['minDate'] || '-20';
                var maxDate = attrs['maxDate'] || '+1M +10D';
                
                element.datepicker({ 
                    minDate: parseInt(minDate),
                    maxDate: maxDate
                });
            }
        }
    }]);