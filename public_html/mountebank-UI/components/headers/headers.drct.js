/**
 * This directive takes an array of key, value objects and allows
 * adding, editing and deleting those key value pairs
 *  
 */

angular.module('myApp').directive('headers',
        function ($log, TPL_PATH) {

            return {
                templateUrl: TPL_PATH + 'components/headers/headers.tpl.html',
                restrict: 'E',
                scope: {
                    "array": '='
                },
                controller: function ($scope, $attrs, $element) {
                    
                    /**
                     * currently unused handler for on-blur
                     * @param {type} thisValue
                     * @param {type} event
                     * @returns {undefined}
                     */
                    
                    $scope.inputChange = function(thisValue,event)
                    {
                        
                    }

                    $scope.deleteResponseHeader = function (idx)
                    {
                        var doDelete = confirm("Delete this Header?");
                        if (doDelete)
                        {
                            $scope.array.splice(idx, 1);
                        }
                    }
                    $scope.addResponseHeader = function ()

                    {
                        var newItem = {"key": "", "value": ""};
                        $scope.array.push(newItem);

                    }




                }
            };

        });