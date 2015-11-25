describe('Home Pages', function () {

    beforeEach(module('myApp'));

    it('should test the homePages controller', inject(function ($controller, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        scope.currentImposter = {}; 

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope
        });
        expect(typeof scope.home.errorMessage).toEqual("string");
        expect(scope.home.errorMessage).toEqual("No errors");
        expect(scope.home.data.items[0].name).toEqual("Fred")
        scope.home.data.items[0].name = "zipwit";
        scope.home.inputChange();
        var mapData = angular.fromJson(scope.home.displayData);
        expect(mapData.items[0].name).toEqual("zipwit");
        
        
    }));

   

});
