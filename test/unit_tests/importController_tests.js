describe('importController_tests.js -- Import', function () {



    beforeEach(function ()
    {
        module('myApp', function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('testing3');
            localStorageServiceProvider.setStorageType('sessionStorage');

        });


    });

    it('should test the import controller', inject(function ($controller,
            ImpostersService, HEADER_LOCATION,
            $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        $controller('ImportCtrl as import', {
            $scope: scope
        });

        expect(scope.import.headerLocation).toEqual(HEADER_LOCATION);

    }));

    it('should test save Collection', inject(function ($controller,
            ImpostersService, HEADER_LOCATION,
            $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        $controller('ImportCtrl as import', {
            $scope: scope
        });

         
        spyOn(ImpostersService, 'importCollection');
        var exp = ImpostersService.exportCollection();
        scope.import.saveCollection();
        expect(ImpostersService.importCollection).toHaveBeenCalledWith(exp);

    }));


});

 