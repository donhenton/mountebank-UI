describe('Home Pages', function () {

    beforeEach(module('app.homePages'));

    it('should test the homePages controller', inject(function ($controller, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
         

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope
        });
        expect(scope.home.welcome_message.length).toBeGreaterThan(0);
    }));

    it('should properly provide a welcome message', inject(function (welcomeMessage) {
        expect(welcomeMessage()).toMatch(/welcome/i);
    }));

});
