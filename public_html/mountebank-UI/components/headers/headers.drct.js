/**
 * This directive takes an array of key, value objects and allows
 * adding, editing and deleting those key value pairs
 *  
 *  it has the following attributes:
 *  array -- the array of key,value elements to write to
 *  customize (optional) an object of the form of {"keyLabel": "Field","headerText":"text"}
 *  the keylabel will appear at the label for the key input
 *  headerText is a label for the entire unit
 *  
 */

angular.module('myApp').directive('headers',
        function ($log, TPL_PATH) {

            return {
                templateUrl: TPL_PATH + 'components/headers/headers.tpl.html',
                restrict: 'E',
                scope: {
                    "array": '=', "customize": '=?'
                },
                compile: function (element, attributes)
                {


                    var linkFunction = function ($scope, element, attributes) {
                        
                        // initialize the labels done here as controller 
                        // doesn't quite have access to info 
                        // from the scope attrs
                        
                        if (!$scope.customize)
                        {
                            $scope.customize = {};
                            $scope.customize.keyLabel = "Key";
                            $scope.customize.headerText = "";
                        }
                         

                    };

                    return linkFunction;
                },
                controller: function ($scope, $attrs, $element) {

                    /**
                     * currently unused handler for on-blur
                     * @param {type} thisValue
                     * @param {type} event
                     * @returns {undefined}
                     */

                    $scope.inputChange = function (thisValue, event)
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