angular.module('myApp')

        .controller('MainHelpCtrl', function ($scope, $log,  HEADER_LOCATION) {
            var vm = this;
            vm.headerLocation = HEADER_LOCATION;
             
        });

