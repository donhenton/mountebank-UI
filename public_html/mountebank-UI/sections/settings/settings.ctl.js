angular.module('myApp')

        .controller('SettingsCtrl', function ($scope, $log, TPL_PATH,HEADER_LOCATION,
                ImpostersService, currentImposter, $uibModal, collectionItems) {
            var vm = this;

            vm.currentImposter = currentImposter;
            
            vm.headerLocation = HEADER_LOCATION;
            vm.currentCollectionIdx = vm.currentImposter.id; // the index into the collection array
            vm.collectionSelectorIdx = vm.currentCollectionIdx.toString();
            vm.collectionItems = collectionItems;

            $scope.$watch(
                    function watchDisplayData(scope) {
                        // Return the "result" of the watch expression.
                        return(vm.currentImposter);
                    },
                    function handleDisplayChange(newValueStr, oldValueStr) {
                        try
                        {
                            ImpostersService.save();


                        }
                        catch (err)
                        {
                            vm.errorMessage = err.message;
                        }
                    }, true
                    );





            vm.changeCollection = function ()
            {

                // $log.debug("called change collection")
                vm.currentCollectionIdx = parseInt(vm.collectionSelectorIdx);
                ImpostersService.setCollectionTo(vm.currentCollectionIdx);
                vm.currentImposter = ImpostersService.getCurrentImposter();
            }

            vm.deleteCollection = function ()
            {
                if (ImpostersService.getCollectionItems().length == 1)
                {
                    alert("Cannot delete last item in collection");
                    return;
                }
                var desc = vm.currentImposter.description;
                var doDelete = confirm("Delete Collection '" + desc + "' ?");
                if (doDelete)
                {
                    ImpostersService.deleteCollectionAt(vm.currentCollectionIdx);
                    vm.currentCollectionIdx = 0;
                    vm.collectionSelectorIdx = vm.currentCollectionIdx.toString();
                    ImpostersService.setCollectionTo(vm.currentCollectionIdx);
                    vm.currentImposter = ImpostersService.getCurrentImposter();
                    vm.collectionItems = ImpostersService.getCollectionItems();
                }
            }

            /**
             * update the text in the boxes when editing the description
             * @returns {undefined}
             */
            vm.updateList = function ()
            {
                vm.collectionItems = ImpostersService.getCollectionItems();
            }

            vm.createNewCollection = function ()
            {
                ImpostersService.createNewCollection();
                vm.currentImposter = ImpostersService.getCurrentImposter();
                vm.collectionItems = ImpostersService.getCollectionItems();
                vm.currentCollectionIdx = vm.currentImposter.id; // the index into the collection array
                vm.collectionSelectorIdx = vm.currentCollectionIdx.toString();
            }
            
            vm.formatDefault = function(pretty) {
              
             
               if (vm.isJsonString( vm.currentImposter.defaultBody))
                {
                    var jRef = angular.fromJson(vm.currentImposter.defaultBody);
                    if (pretty === true)
                    {
                         vm.currentImposter.defaultBody = angular.toJson(jRef, true);
                    }
                    else
                    {
                         vm.currentImposter.defaultBody = angular.toJson(jRef, false);
                    }

                }
              
            }
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
            
            vm.isJsonString = function (str) {
               if (!str) return false;
               if (str.trim().length == 0) {
                 return false;
               }
                try {
                    angular.fromJson(str);
                } catch (e) {
                    return false;
                }
                return true;
            };

        });

