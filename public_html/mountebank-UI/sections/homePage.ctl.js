

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService) {
            vm = this;
            vm.errorMessage = "No errors";
            vm.data = ImpostersService.getData("1");
            vm.currentIndex = 0;
            vm.mounteBankUrl = "http://localhost:4545"
            vm.currentImposter = null;
            vm.responseBuffer = {};
            vm.responseBuffer.headerCount = [1,2,3,4,5];

            //change which imposter you are on
            vm.changeImposter = function (idx)
            {
                // $log.debug(idx);
                vm.currentIndex = idx;
                vm.currentImposter = vm.data.imposters[vm.currentIndex];
                scatter();



            }

            function scatter()
            {
                vm.responseBuffer.status  = vm.currentImposter.response.status;
                vm.responseBuffer.headers = vm.currentImposter.response.headers;
                vm.responseBuffer.body    =  angular.toJson(vm.currentImposter.response.body,true);

            }
            //initial call
            vm.changeImposter(vm.currentIndex);

            vm.inputChange = function (item, event)
            {
                //console.log(angular.toJson(item))
            }


            vm.tabSelect = function (x)
            {
                $log.debug("tab " + x);
                vm.displayData = angular.toJson(vm.data, true);
            }


            vm.displayData = angular.toJson(vm.data, true);

//            $scope.$watch(
//                    function watchDisplayData(scope) {
//                        // Return the "result" of the watch expression.
//                        return(vm.data);
//                    },
//                    function handleDisplayChange(newValueStr, oldValueStr) {
//                        try
//                        {
//                            vm.displayData = angular.toJson(newValueStr,true);
//                             $log.debug("called change ")
//                            vm.errorMessage =  "No errors";
//                        }
//                        catch (err)
//                        {
//                            vm.errorMessage = err.message;
//                        }
//                    }
//            );

        });
