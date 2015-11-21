 angular.module('myApp')

        .controller('JsonCtrl', function ($scope, $log,TPL_PATH,ImpostersService,currentImposter) {
            var vm = this;
    
            vm.currentImposter = currentImposter;
            vm.headerLocation = TPL_PATH +"partials/plainHeader.tpl.html"
            vm.displayData = angular.toJson(vm.currentImposter,true);
    
        });

