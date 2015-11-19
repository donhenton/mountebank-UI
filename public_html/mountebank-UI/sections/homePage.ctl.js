

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService) {
            vm = this;
            vm.errorMessage = "No errors";
            vm.data = ImpostersService.getData("1");
            vm.currentIndex = 0;
            vm.mounteBankUrl = "http://localhost:4545"
            vm.currentImposter = null;
            vm.responseBuffer = {};
            vm.responseBuffer.headerCount = [];
            var MAX_RESPONSE_HEADERS = 5;
            for (var i=0;i<MAX_RESPONSE_HEADERS;i++)
            {
                vm.responseBuffer.headerCount.push(i+1)
            }

            //change which imposter you are on
            vm.changeImposter = function (idx)
            {
                // $log.debug(idx);
                vm.currentIndex = idx;
                vm.currentImposter = vm.data.imposters[vm.currentIndex];
                scatter();



            }
            
            function gather()
            {
                vm.currentImposter.response.status =vm.responseBuffer.status  ;
                var hitCounter = 0;
                delete vm.currentImposter.response.headers;
                vm.currentImposter.response.headers ={};
                angular.forEach(vm.responseBuffer.headers,function(data,idx)
                {
                    if (typeof data.key !== 'undefined' && data.key.trim() !== "")
                    {
                      vm.currentImposter.response.headers[data.key] = data.value;
                  }
                });
                 
                
            }

            function scatter()
            {
                vm.responseBuffer.status = vm.currentImposter.response.status;
                vm.responseBuffer.headers = [];
                 var headerPropCt = 0;
                for (var propertyName in vm.currentImposter.response.headers) {
                    var item = {};
                    item.value
                            = vm.currentImposter.response.headers[propertyName];
                    item.key
                            = propertyName;
                    vm.responseBuffer.headers.push(item);
                    headerPropCt ++;
                    // keys.push(propertyName);
                    // values.push(person[propertyName]);
                }
                for (var k=headerPropCt;k<MAX_RESPONSE_HEADERS;k++)
                {
                    var item = {};
                    item.value = "";
                    item.key  = "";
                    vm.responseBuffer.headers.push(item);
                }
                
                //body
              vm.responseBuffer.body = angular.toJson(vm.currentImposter.response.body, true);

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
                gather();
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
