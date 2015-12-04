describe('helpController_tests.js -- help', function () {

 

    beforeEach(function ()
    {
        module('myApp');
       

    });


    it('should test the Main Help controller', inject(function ($controller,
            HEADER_LOCATION,
            $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        $controller('MainHelpCtrl as mainhelp', {
            $scope: scope
        });

        expect(scope.mainhelp.headerLocation).toEqual(HEADER_LOCATION);

    }));

    it('should test the  Help controller', inject(function ($controller,
            HEADER_LOCATION,
            $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        
        var $uibModalInstance = {
            dismiss: function () { }
        };

        spyOn($uibModalInstance, "dismiss");


        $controller('HelpCtrl as help', {
            $scope: scope,
            $uibModalInstance: $uibModalInstance
        });
        
        scope.cancel();
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');

    }));



});

 