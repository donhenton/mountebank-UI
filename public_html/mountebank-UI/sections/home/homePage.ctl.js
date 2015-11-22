

angular.module('myApp')

        .controller('HomeCtrl', function ($scope, $log, ImpostersService, currentImposter, collectionItems) {
            var vm = this;
            vm.errorMessage = "No errors";
            vm.buffer = {};
            vm.buffer.data = currentImposter;
            vm.currentImposterIdx = 0; //the imposter 
            vm.currentResponseIdx = 0; //the current response for the imposter
            vm.collectionItems = collectionItems; //used for the select box
            vm.currentCollectionIdx = vm.buffer.data.id; // the index into the collection array
            vm.collectionSelectorIdx = vm.currentCollectionIdx.toString();


            vm.matchTypes = ['matches', 'equals', 'contains','not equals','not contains'];


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

            vm.changeCollection = function ()
            {
                //  $log.debug("HIT CHANGE COLLECTION")
                vm.currentImposterIdx = 0; //reset 
                vm.currentResponseIdx = 0; //reset

                vm.currentCollectionIdx = parseInt(vm.collectionSelectorIdx);
                ImpostersService.setCollectionTo(vm.currentCollectionIdx);
                vm.buffer.data = ImpostersService.getCurrentImposter();
            }


            vm.changeImposter = function (idx)
            {

                // $log.debug(idx);
                vm.currentImposterIdx = idx;


            }

            vm.addImposter = function ()
            {
                var newImposter = ImpostersService.createNewImposter();
                vm.buffer.data.imposters.push(newImposter);

            }

            vm.deleteImposter = function ()
            {
                var doDelete = confirm("Delete this Imposter?");
                if (doDelete)
                {
                    vm.buffer.data.imposters.splice(vm.currentImposterIdx, 1);
                    vm.currentImposterIdx = 0;
                    vm.currentResponseIdx = 0;
                }
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


        });
