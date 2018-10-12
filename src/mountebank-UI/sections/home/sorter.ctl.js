angular.module('myApp')

        .controller('SortCtrl', function ($scope, $log, sortItems, $uibModalInstance) {

            $scope.sortItems = sortItems;

            $scope.ok = function () {

                $uibModalInstance.close($scope.sortItems);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.sortCallbacks = {
                update: function (e, ui) {
                    
                },
                stop: function (e, ui) {
                     
                     //http://codepen.io/thgreasi/pen/jlkhr
                }
            };

        });
