

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService) {
            var vm = this;
            vm.errorMessage = "No errors";
            vm.data = ImpostersService.getData("1");
            vm.currentIndex = 0;
            vm.mounteBankUrl = "http://localhost:4545"
            vm.currentImposter = null;
            vm.buffer = {};
            vm.buffer.responseBuffer = {};
            //to be used later for multiple responses
            vm.currentResponseIdx = 0;
            vm.buffer.criteriaBuffer = {};
            vm.buffer.criteriaBuffer.matchTypes = ['matches', 'equals', 'regex', 'startsWith', 'contains', 'endsWith']
            vm.buffer.responseBuffer.headerCount = [];
            vm.buffer.criteriaBuffer.headerCount = [];
            var MAX_RESPONSE_HEADERS = 5;
            for (var i = 0; i < MAX_RESPONSE_HEADERS; i++)
            {
                vm.buffer.responseBuffer.headerCount.push(i + 1);
                vm.buffer.criteriaBuffer.headerCount.push(i + 1);
            }

            //change which imposter you are on
            vm.changeImposter = function (idx)
            {
                //TODO prior to changing the item save the current item to currenImposter
                // save via watch??? call service to save????
                gather();
                $log.debug(idx);
                vm.currentIndex = idx;
                vm.currentImposter = vm.data.imposters[vm.currentIndex];
                scatter();

            }

            /**
             * fired when user changes the type of match criteria,
             * eg, regex, equals, startswith ......
             * @param {type} item
             * @param {type} event
             * @returns {undefined}
             */
            vm.matchTypeChange = function (newData)
            {

                $log.debug("stored->" + vm.currentImposter
                        .match.body_match.type + " new->" + newData);

                if (vm.currentImposter.match.body_match.type === newData)
                {
                    return;
                }
                // zero out the structures


                /*
                 
                 vm.buffer.criteriaBuffer.bodyMatchType = vm.currentImposter.match.body_match.type;
                 vm.buffer.criteriaBuffer.body = {};
                 vm.buffer.criteriaBuffer.matchContent = "";
                 
                 if (vm.isEqualRequest(vm.criteriaBuffer.bodyMatchType))
                 {
                 vm.buffer.criteriaBuffer.body = angular.toJson(vm.currentImposter.match.body_match.body, true);
                 }
                 else
                 {
                 vm.buffer.criteriaBuffer.matchContent = vm.currentImposter.match.body_match.match_content;
                 }
                 
                 
                 
                 
                 match -->
                 "body_match":
                 {
                 "type": "regex",
                 "matchContent": "*search1*"
                 }
                 
                 "body_match":
                 {
                 "type": "equals",
                 "body": {
                 "search": "ice"
                 }
                 }
                 
                 
                 */
                //vm.buffer.criteriaBuffer.bodyMatchType = vm.currentImposter.match.body_match.type;
                // $log.debug(" xxx "+vm.criteriaBuffer.bodyMatchType);

            }

            /**
             * central routine for determining if match request is using 
             * equals, as opposed to regex, startswith ....
             * @param {type} item
             * @returns {Boolean}
             */
            vm.isEqualRequest = function (item)
            {
                if (item === 'equals')
                {
                    return true;
                }
                return false;
            }
            //initial call
            vm.changeImposter(vm.currentIndex);

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

            /**
             * called when tabs are changed
             * @param {type} x
             * @returns {undefined}
             */
            vm.tabSelect = function (x)
            {
                $log.debug("tab " + x);
                gather();
                vm.displayData = angular.toJson(vm.data, true);
            }


            vm.displayData = angular.toJson(vm.data, true);

            $scope.$watch(
                    function watchDisplayData(scope) {
                        // Return the "result" of the watch expression.
                        return(vm.buffer);
                    },
                    function handleDisplayChange(newValueStr, oldValueStr) {
                        try
                        {

                            //$log.debug("called change ")

                        }
                        catch (err)
                        {
                            vm.errorMessage = err.message;
                        }
                    }, true
                    );

///////////////////////////////////////////////////////////////////////////////
            /**
             * move current imposter data to buffer
             * @returns {undefined}
             */
            function scatter()
            {
                scatterResponse();
                scatterCriteria();
            }
            /**
             * move buffer back to data
             * @returns {undefined}
             */
            function gather()
            {
                if (!vm.currentImposter)
                {
                    return;
                }
                gatherResponse();
                gatherCriteria();


            }


            /**
             * gather for the response section
             * @returns {undefined}
             */
            function gatherResponse()
            {

                vm.currentImposter.responses[vm.currentResponseIdx].status = vm.buffer.responseBuffer.status;
                var hitCounter = 0;
                delete vm.currentImposter.responses[vm.currentResponseIdx].headers;
                vm.currentImposter.responses[vm.currentResponseIdx].headers = {};
                angular.forEach(vm.buffer.responseBuffer.headers, function (data, idx)
                {
                    if (typeof data.key !== 'undefined' && data.key.trim() !== "")
                    {
                        vm.currentImposter.responses[vm.currentResponseIdx].headers[data.key] = data.value;
                    }
                });
                vm.currentImposter.responses[vm.currentResponseIdx].body =
                        angular.fromJson(vm.buffer.responseBuffer.body);

            }


            /**
             * scatter for the response section
             * @returns {undefined}
             */
            function scatterResponse()
            {
                vm.buffer.responseBuffer.status = vm.currentImposter.responses[vm.currentResponseIdx].status;
                vm.buffer.responseBuffer.headers = [];
                var headerPropCt = 0;
                for (var propertyName in vm.currentImposter.responses[vm.currentResponseIdx].headers) {
                    var item = {};
                    item.value
                            = vm.currentImposter.responses[vm.currentResponseIdx].headers[propertyName];
                    item.key
                            = propertyName;
                    vm.buffer.responseBuffer.headers.push(item);
                    headerPropCt++;
                    // keys.push(propertyName);
                    // values.push(person[propertyName]);
                }
                for (var k = headerPropCt; k < MAX_RESPONSE_HEADERS; k++)
                {
                    var item = {};
                    item.value = "";
                    item.key = "";
                    vm.buffer.responseBuffer.headers.push(item);
                }

                //body
                vm.buffer.responseBuffer.body = angular.toJson(vm.currentImposter.responses[vm.currentResponseIdx].body, true);

            }
            
            function gatherCriteria()
            {
                vm.currentImposter.match.path =vm.buffer.criteriaBuffer.path 
                vm.currentImposter.match.verb =vm.buffer.criteriaBuffer.verb ;
                
                vm.currentImposter.responses[vm.currentResponseIdx].headers = {};
                angular.forEach(vm.buffer.responseBuffer.headers, function (data, idx)
                {
                    if (typeof data.key !== 'undefined' && data.key.trim() !== "")
                    {
                        vm.currentImposter.responses[vm.currentResponseIdx].headers[data.key] = data.value;
                    }
                });
                
            }
            
            
            
            /**
             * scatter for the criteria section
             * @returns {undefined}
             */
            function scatterCriteria()
            {

                vm.buffer.criteriaBuffer.path = vm.currentImposter.match.path;
                vm.buffer.criteriaBuffer.verb = vm.currentImposter.match.verb;
                vm.buffer.criteriaBuffer.headers = [];
                var headerPropCt = 0;
                for (var propertyName in vm.currentImposter.match.headers) {
                    var item = {};
                    item.value
                            = vm.currentImposter.match.headers[propertyName];
                    item.key
                            = propertyName;
                    vm.buffer.criteriaBuffer.headers.push(item);
                    headerPropCt++;
                    // keys.push(propertyName);
                    // values.push(person[propertyName]);
                }
                for (var k = headerPropCt; k < MAX_RESPONSE_HEADERS; k++)
                {
                    var item = {};
                    item.value = "";
                    item.key = "";
                    vm.buffer.criteriaBuffer.headers.push(item);
                    // deletevm.buffer.criteriaBuffer.bodyMatch.body;
                }
                 vm.buffer.criteriaBuffer.bodyMatch = angular.copy(vm.currentImposter.match.body_match);
                 delete vm.buffer.criteriaBuffer.bodyMatch.body;
                 vm.buffer.criteriaBuffer.bodyMatch.body ="";

                if (vm.isEqualRequest(vm.buffer.criteriaBuffer.bodyMatch.type))
                {
                     
                    vm.buffer.criteriaBuffer.bodyMatch.body = 
                            angular.toJson(vm.currentImposter.match.body_match.body, true);
                    vm.buffer.criteriaBuffer.bodyMatch.matchContent = "";
                }
                else
                {
                    vm.buffer.criteriaBuffer.bodyMatch.matchContent = vm.currentImposter.match.body_match.matchContent;
                    vm.buffer.criteriaBuffer.bodyMatch.body = {};
                }

            }


        });
