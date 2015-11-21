 angular.module('myApp')

        .controller('SettingsCtrl', function ($scope, $log,TPL_PATH,
            ImpostersService,currentImposter,collectionItems) {
            var vm = this;
    
            vm.currentImposter = currentImposter;
            vm.mounteBankUrl = "http://localhost:4545";
            vm.headerLocation = TPL_PATH +"partials/plainHeader.tpl.html"
            
            vm.collectionItems =  collectionItems;
            
            vm.updateList = function()
            {
                vm.collectionItems = ImpostersService.getCollectionItems();
            }
            
            vm.createNewCollection = function()
            {
                ImpostersService.createNewCollection();
            }
    
        });

