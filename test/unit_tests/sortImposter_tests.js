describe('sortImposter_tests.js -- sort', function () {

    var sortItems = [1,2,3];

    beforeEach(function ()
    {
        module('myApp');
        module(function ($provide) {

            function sortItemsFunction()
            {
                return sortItems;

            }
 
            $provide.factory('sortItems', [sortItemsFunction]);
             

        });

    });


    it('should test the sort controller', inject(function ($controller,
            sortItems,
            $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var $uibModalInstance = {
            close: function () { },
            dismiss: function () { }
        };

        spyOn($uibModalInstance, "dismiss");
        spyOn($uibModalInstance, "close");


        $controller('SortCtrl as sort', {
            $scope: scope,
            sortItems: sortItems,
            $uibModalInstance: $uibModalInstance
        });
        
        
        
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
        
        scope.ok();
        expect($uibModalInstance.close).toHaveBeenCalledWith(sortItems);
        
        scope.sortCallbacks.update(null,null);
        scope.sortCallbacks.stop(null,null)
        
    }));

    


});

 