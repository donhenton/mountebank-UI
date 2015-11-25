angular.module('myApp')

        .controller('ImportCtrl', function ($log, TPL_PATH, HEADER_LOCATION ,
           ImpostersService) {
            var vm = this;
            vm.headerLocation = HEADER_LOCATION;
            vm.message = "";
            var baseMessageClass = "emphasis pull-right";   
            vm.collectionJSON = ImpostersService.exportCollection();
            vm.messageClasses = baseMessageClass + " text-success";
            
            vm.saveCollection = function()
            {
                 ImpostersService.importCollection(vm.collectionJSON);
                 vm.message = "Successfully Imported"
            }

        });

