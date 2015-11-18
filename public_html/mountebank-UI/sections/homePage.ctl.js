

angular.module('app.homePages', [])



        .controller('HomeCtrl', function ($scope, $log  ) {
            vm = this;
            vm.errorMessage = "No errors";
            vm.data =
                    {
                        "id": "alpha",
                        "items": [
                            {"name": "Fred", "age": 34},
                            {"name": "John", "age": 12},
                            {"name": "Lorenzo", "age": 24},
                            {"name": "Betgh", "age": 76},
                            {"name": "Mary", "age": 26}
                        ]

                    }


            vm.inputChange = function (angularForm,ev)
            {
               //  $log.debug("inputChange "+ev)  ; 
                 
               //  vm.data.items[idx] = angularForm.item
               vm.displayData = angular.toJson(vm.data, true);
                
            }



            vm.displayData = angular.toJson(vm.data, true);

            $scope.$watch(
                    function watchDisplayData(scope) {
                        // Return the "result" of the watch expression.
                        return(vm.displayData);
                    },
                    function handleDisplayChange(newValueStr, oldValueStr) {
                        try
                        {
                            vm.data = angular.fromJson(newValueStr);
                           // $log.debug("SMMDKFJLDFJDLFJDLJ")
                            vm.errorMessage =  "No errors";
                        }
                        catch (err)
                        {
                            vm.errorMessage = err.message;
                        }
                    }
            );

        });
