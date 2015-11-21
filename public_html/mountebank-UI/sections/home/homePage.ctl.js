

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService,currentImposter) {
            var vm = this;
            vm.errorMessage = "No errors";
            vm.data = currentImposter;
            vm.currentImposterIdx = 0; //the imposter 
            vm.currentResponseIdx = 0; //the current response for the imposter
            vm.mounteBankUrl = "http://localhost:4545";
            vm.buffer = {};
            vm.buffer.data = vm.data;
            vm.displayData = "";

            vm.matchTypes = ['matches', 'equals', 'regex', 'startsWith', 'contains', 'endsWith'];


            /**
             * take the type, find the ref
             *  to modify 
             * 
             *  
             * @param {type} type responseBody, matchBody
             * @param {type} pretty
             * @returns {undefined}
             */
            vm.formatJson = function (type, pretty)
            {
                var ref = null;
                if (type == 'responseBody')
                {
                  ref =  vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx];
                }
                else
                {
                  ref =  vm.buffer.data.imposters[vm.currentImposterIdx].match.body_match;  
                }


                //body
                if (vm.isJsonString(ref.body))
                {
                    var jRef = angular.fromJson(ref.body);
                    if (pretty == true)
                    {
                        ref.body = angular.toJson(jRef, true);
                    }
                    else
                    {
                        ref.body = angular.toJson(jRef, false);
                    }

                }


                
            }



            /**
             * test if a string is a valid json object
             * @param {type} str
             * @returns {Boolean}
             */
            vm.isJsonString = function (str) {
                try {
                    angular.fromJson(str);
                } catch (e) {
                    return false;
                }
                return true;
            }


            vm.deleteResponseHeader = function (idx)
            {
                vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].headers.splice(idx, 1);
            }
            vm.addResponseHeader = function ()

            {
                var newItem = {"key": "", "value": ""};
                vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].headers.push(newItem);

            }

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

                            vm.displayData = angular.toJson(vm.data, true)

                        }
                        catch (err)
                        {
                            vm.errorMessage = err.message;
                        }
                    }, true
                    );






        });
