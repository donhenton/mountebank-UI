angular.module('myApp')

        .controller('HelpCtrl', function ($scope, $log, $uibModalInstance, HEADER_LOCATION) {
            var vm = this;
             

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });

