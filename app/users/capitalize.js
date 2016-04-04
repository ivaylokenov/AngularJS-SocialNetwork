angular.module('myApp.filters.capitalize', [])
    .filter('capitalize', [function() {
        return function(input, length) {
            length = length || 1;
            
            if (input.length < length) {
                length = input.length;
            }
            
            var capitalLetters = '';
            
            for (var i = 0; i < length; i++) {
                capitalLetters += input[i].toUpperCase();
            }
            
            return capitalLetters + input.substr(length);
        }  
    }])