/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('settingsController_tests.js -- Settings', function () {


    beforeEach(function ()
    {
        module('myApp');
        module(function ($provide) {

            function currentImposterFunction()
            {
                return angular.copy(harness.imposterTest.newCollection[0]);

            }

            function collectionItemsFunction()
            {


                return angular.copy(harness.imposterTest.newCollection);
                ;
            }


            $provide.factory('currentImposter', [currentImposterFunction]);
            $provide.factory('collectionItems', [collectionItemsFunction]);
        });
    });

    it('testSwapInjectionForResponse', inject(function ($controller,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        var test = scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].injection.use;
        expect(scope.home.currentResponseIdx).toEqual(0);
        expect(test).toEqual(false);
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].status = 400;
        scope.home.swapInjectionForResponse();
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].status).toEqual(400);

        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].injection.use = true;
        scope.home.swapInjectionForResponse();
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].status).toEqual(200);

    }));

    it('testSwapInjectionForMatch', inject(function ($controller,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        var test = scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.injection.use;
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].status = 400;
        expect(test).toEqual(false);

        scope.home.swapInjectionForMatch();
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.injection.use).toEqual(false);

        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.injection.use = true;
        scope.home.swapInjectionForMatch();
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.injection.use).toEqual(true);
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].status).toEqual(400);

    }));

    it('testMoveResponse', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(scope.home.currentResponseIdx).toEqual(0);
        scope.home.moveResponseTo(-100);
        expect(scope.home.currentResponseIdx).toEqual(-100);

    }));

    it('testDeleteResponseConfirmed', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        spyOn(window, 'confirm').and.returnValue(true);

        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.push(ImpostersService.getSampleResponse());
        scope.home.currentResponseIdx = 1;
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.length).toEqual(2);
        scope.home.deleteResponse();
        expect(scope.home.currentResponseIdx).toEqual(0);
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.length).toEqual(1);


    }));
    
     it('testDeleteResponseConfirmed', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        spyOn(window, 'confirm').and.returnValue(false);

        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.push(ImpostersService.getSampleResponse());
        scope.home.currentResponseIdx = 1;
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.length).toEqual(2);
        scope.home.deleteResponse();
        expect(scope.home.currentResponseIdx).toEqual(1);
        expect(scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses.length).toEqual(2);


    }));


});