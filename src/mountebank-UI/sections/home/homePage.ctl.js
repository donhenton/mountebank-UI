

/* global angular */

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService, currentImposter, 
                collectionItems, $uibModal, TPL_PATH, HEADER_LOCATION) {
            var vm = this;
            vm.errorMessage = "";
            vm.buffer = {};
            vm.buffer.data = currentImposter;
            vm.currentImposterIdx = 0; //the imposter 
            vm.currentResponseIdx = 0; //the current response for the imposter
            vm.collectionItems = collectionItems; //used for the select box
            vm.currentCollectionIdx = vm.buffer.data.id; // the index into the collection array
            vm.collectionSelectorIdx = vm.currentCollectionIdx.toString();
            vm.headerLocation = HEADER_LOCATION;
            vm.matchTypes = ['matches', 'equals', 'contains', 'not equals', 'not contains'];

            vm.queryParamCustomizer = {};
            vm.queryParamCustomizer.keyLabel = "Field";
            vm.queryParamCustomizer.headerText = "";

            /**
             * called when swapping to injection for the current response section
             * @returns {undefined}
             */
            vm.swapInjectionForResponse = function ()
            {
                //$log.debug(" x "+vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].injection.use)
 
 
                if (vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].injection.use)
                {
                    //blank out the current response
                    vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx] =
                            ImpostersService.getSampleResponse();
                    vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].injection.use = true;

                }
            };

            /**
             * called when swapping to injection for the match section
             * 
             * @returns {undefined}
             */
            vm.swapInjectionForMatch = function ()
            {

                if (vm.buffer.data.imposters[vm.currentImposterIdx].match.injection.use)
                {
                    var responseCopy = angular.copy(vm.buffer.data.imposters[vm.currentImposterIdx].responses);
                    vm.buffer.data.imposters[vm.currentImposterIdx] =
                            ImpostersService.createNewImposter();

                    vm.buffer.data.imposters[vm.currentImposterIdx].responses = responseCopy;
                    vm.buffer.data.imposters[vm.currentImposterIdx].match.injection.use = true;
                }


            };

            /**
             * called when moving through the responses
             * @param {type} idx
             * @returns {undefined}
             */
            vm.moveResponseTo = function (idx)
            {
                vm.currentResponseIdx = idx;

             };

            /**
             * display the sorting dialog
             * @returns {$uibModal@call;open.result}
             */
            showSortDialog = function ()
            {

                var sortItems = [];
                angular.forEach(vm.buffer.data.imposters, function (data, idx) {

                    sortItems.push({"value": idx, "ref": angular.copy(data), "text": vm.composeSortAlias(idx)});
                });

                var modalInstance =
                        $uibModal.open({
                            templateUrl: TPL_PATH + 'sections/home/sorter_content.tpl.html',
                            controller: 'SortCtrl',
                            windowClass: 'app-modal-window',
                            resolve: {
                                sortItems: function () {
                                    return angular.copy(sortItems);
                                }
                            }
                        });
                return modalInstance.result;
            };


            /**
             * sort imposters as the order of evaluation is important
             * imposters and their match criteria use short circuit logic:
             * first match is what you go with.
             * 
             * @returns {undefined}
             */
            vm.sortImposters = function ()
            {
                var sortResult = showSortDialog();
                sortResult.then(function (result) {
                    if (result !== 'cancel')
                    {


//                        var rr = newSortItems.map(function (i) {
//                            return i.value;
//                        }).join(', ');
                        vm.buffer.data.imposters = [];
                        angular.forEach(result, function (data, idx)
                        {
                            vm.buffer.data.imposters.push(data.ref);

                        });


                    }
                });


            };

            /**
             * add a new response section
             * @returns {undefined}
             */
            vm.addResponse = function ()
            {
                vm.buffer.data.imposters[vm.currentImposterIdx]
                        .responses.push(
                                ImpostersService.getSampleResponse());
                vm.currentResponseIdx = vm.currentResponseIdx + 1;

            };

            /**
             * delete the current response section
             * @returns {undefined}
             */
            vm.deleteResponse = function ()
            {
                var doDelete = confirm("Delete this Response?");
                if (doDelete)
                {
                    vm.buffer.data.imposters[vm.currentImposterIdx]
                            .responses.splice(vm.currentResponseIdx, 1);
                    vm.currentResponseIdx = 0;
                }
            };

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
                    ref = vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx];
                }
                else
                {
                    ref = vm.buffer.data.imposters[vm.currentImposterIdx].match.body_match;
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



            };



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
            };


            vm.deleteResponseHeader = function (idx)
            {
                vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].headers.splice(idx, 1);
            };
            vm.addResponseHeader = function ()

            {
                var newItem = {"key": "", "value": ""};
                vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].headers.push(newItem);

            };

            vm.changeCollection = function ()
            {
                //  $log.debug("HIT CHANGE COLLECTION")
                vm.currentImposterIdx = 0; //reset 
                vm.currentResponseIdx = 0; //reset

                vm.currentCollectionIdx = parseInt(vm.collectionSelectorIdx);
                ImpostersService.setCollectionTo(vm.currentCollectionIdx);
                vm.buffer.data = ImpostersService.getCurrentImposter();
            };


            vm.changeImposter = function (idx)
            {

                // $log.debug(idx);
                vm.currentImposterIdx = idx;
                vm.currentResponseIdx = 0;



            };

            vm.addImposter = function ()
            {
                var newImposter = ImpostersService.createNewImposter();
                vm.buffer.data.imposters.push(newImposter);

            };

            vm.deleteImposter = function ()
            {
                var doDelete = confirm("Delete this Imposter?");
                if (doDelete)
                {
                    vm.buffer.data.imposters.splice(vm.currentImposterIdx, 1);
                    vm.currentImposterIdx = 0;
                    vm.currentResponseIdx = 0;
                }
            };

            /**
             * called when tabs are changed
             * @param {type} x
             * @returns {undefined}
             */
            vm.tabSelect = function (x)
            {
                // $log.debug("tab " + x);

            };
            /**
             * method for onblur event of form input items
             * @param {type} item
             * @param {type} event
             * @returns {undefined}
             */
            vm.inputChange = function (item, event)
            {
                //console.log(angular.toJson(item))
            };


            vm.doHelpDisplay = function(type)
            {
                //type is predicate or response
                $uibModal.open({
                            templateUrl: TPL_PATH + 'sections/help/help_'+
                                    type+'.tpl.html',
                            controller: 'HelpCtrl' ,
                            "size":"med"
                             
                        });
                
            };
            /**
             * format the javascript 
             * @param {type} injectionSourceParent either
             *  vm.buffer.data.imposters[vm.currentImposterIdx].responses[vm.currentResponseIdx].injection 
                or vm.buffer.data.imposters[vm.currentImposterIdx].match.injection
             * @returns  
             */
            vm.formatInjection = function(injectionSourceParent)
            {
                injectionSourceParent.body = js_beautify(injectionSourceParent.body);
            };
            
            /**
             * used to format the decorate function if any
             * @param {type} currentResponse
             * @returns {undefined}
             */
            vm.formatDecorate = function(currentResponse)
            {
                if (!currentResponse.decorate)
                {
                    currentResponse.decorate = "";
                }
                currentResponse.decorate = js_beautify(currentResponse.decorate);
            }
            
            /**
             * compose the display for the buttons that switch imposters or sort
             * imposters
             * @param {type} idx 0 based value passed in
             * @returns {undefined}
             */
            vm.composeImposterAlias = function(idx)
            {
                var verb = vm.buffer.data.imposters[idx].match.verb;
                if (vm.buffer.data.imposters[idx].match.injection.use)
                {
                    verb = "INJ";
                }
                
                return "Item "+(idx+1) +" (" +verb+")";
            };
            
            
             vm.composeSortAlias = function(idx)
            {
                var verb = vm.buffer.data.imposters[idx].match.verb;
                if (vm.buffer.data.imposters[idx].match.injection.use)
                {
                    verb = "INJ";
                }
                
                var labelText = vm.buffer.data.imposters[idx].documentation;
                
                
                return  "(" +verb+")\n"+labelText ;
            };

            
        });
