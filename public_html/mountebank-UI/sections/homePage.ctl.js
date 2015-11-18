

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService) {
            vm = this;
            vm.errorMessage = "No errors";
            vm.data = ImpostersService.getData("1");
            vm.currentIndex = 0;
   
            vm.changeImposter = function (idx)
            {
               // $log.debug(idx);
                vm.currentIndex = idx;
                vm.currentData = vm.data.imposters[vm.currentIndex];
               

            }
            vm.changeImposter(vm.currentIndex);
 



//            vm.displayData = angular.toJson(vm.data, true);
//
//            $scope.$watch(
//                    function watchDisplayData(scope) {
//                        // Return the "result" of the watch expression.
//                        return(vm.displayData);
//                    },
//                    function handleDisplayChange(newValueStr, oldValueStr) {
//                        try
//                        {
//                            vm.data = angular.fromJson(newValueStr);
//                           // $log.debug("SMMDKFJLDFJDLFJDLJ")
//                            vm.errorMessage =  "No errors";
//                        }
//                        catch (err)
//                        {
//                            vm.errorMessage = err.message;
//                        }
//                    }
//            );

        });
