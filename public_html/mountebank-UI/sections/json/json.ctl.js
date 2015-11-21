 angular.module('myApp')

        .controller('JsonCtrl', function ($log,TPL_PATH,mounteBankDisplay,currentImposter) {
            var vm = this;
    
            vm.currentImposter = currentImposter;
            vm.headerLocation = TPL_PATH +"partials/plainHeader.tpl.html"
            //vm.displayData = angular.toJson(vm.currentImposter,true);
            vm.displayData = mounteBankDisplay;
    
        });

