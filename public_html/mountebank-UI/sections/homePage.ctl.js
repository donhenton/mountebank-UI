

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService) {
            var vm = this;
            vm.errorMessage = "No errors";
            vm.data = ImpostersService.getData("1");
            vm.currentImposterIdx = 0; //the imposter 
            vm.currentResponseIdx = 0; //the current response for the imposter
            vm.mounteBankUrl = "http://localhost:4545";
            vm.buffer = {};
            vm.buffer.data = vm.data;
            vm.displayData = "";

            vm.matchTypes = ['matches', 'equals', 'regex', 'startsWith', 'contains', 'endsWith'];
            vm.changeImposter = function (idx)
            {

                // $log.debug(idx);
                vm.currentImposterIdx = idx;


            }

            /**
             * called when tabs are changed
             * @param {type} x
             * @returns {undefined}
             */
            vm.tabSelect = function (x)
            {
                // $log.debug("tab " + x);

            }
            /**
             * method for onblur event of form input items
             * @param {type} item
             * @param {type} event
             * @returns {undefined}
             */
            vm.inputChange = function (item, event)
            {
                //console.log(angular.toJson(item))
            }

            $scope.$watch(
                    function watchDisplayData(scope) {
                        // Return the "result" of the watch expression.
                        return(vm.data);
                    },
                    function handleDisplayChange(newValueStr, oldValueStr) {
                        try
                        {

                            vm.displayData = angular.toJson(vm.data,true)

                        }
                        catch (err)
                        {
                            vm.errorMessage = err.message;
                        }
                    }, true
                    );






        });
