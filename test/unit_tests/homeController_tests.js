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


    it('testFormatJsonResponseBody', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });



        var sample = {'fred': 100, 'ted': 200};
        var sampleUnformatted = angular.toJson(angular.copy(sample));
        var sampleFormatted = angular.toJson(angular.copy(sample), true);
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].body = sampleUnformatted;
        scope.home.formatJson('responseBody', false);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].body).toEqual(sampleUnformatted);
        scope.home.formatJson('responseBody', true);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].body).toEqual(sampleFormatted);

        var notJson = "[{fred";
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].body = notJson;
        scope.home.formatJson('responseBody', false);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].body).toEqual(notJson);

    }));

    it('testFormatJsonMatchBody', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });



        var sample = {'zed': 100, 'ted': 200};
        var sampleUnformatted = angular.toJson(angular.copy(sample));
        var sampleFormatted = angular.toJson(angular.copy(sample), true);
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.body_match.body = sampleUnformatted;
        scope.home.formatJson('matchBody', false);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.body_match.body).toEqual(sampleUnformatted);
        scope.home.formatJson('matchBody', true);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.body_match.body).toEqual(sampleFormatted);

        var notJson = "[{fred";
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.body_match.body = notJson;
        scope.home.formatJson('matchBody', false);
        expect(
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.body_match.body).toEqual(notJson);

    }));

    it('testComposeImposterAlias', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });



        // scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.verb;
        var test = scope.home.composeImposterAlias(0);
        expect(test).toEqual("Item 1 (GET)");
        scope.home.buffer.data.imposters[scope.home.currentImposterIdx].match.injection.use = true;
        test = scope.home.composeImposterAlias(0);
        expect(test).toEqual("Item 1 (INJ)");



    }));

    it('testAddDeleteResponseHeader', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        var headers =
                scope.home.buffer.data.imposters[scope.home.currentImposterIdx].responses[scope.home.currentResponseIdx].headers;
        expect(headers.length).toEqual(0);

        scope.home.addResponseHeader();
        scope.home.addResponseHeader();
        expect(headers.length).toEqual(2);
        scope.home.deleteResponseHeader();
        expect(headers.length).toEqual(1);

    }));


    it('testAddDeleteImposterAndConfirm', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        var imposters =
                scope.home.buffer.data.imposters;
        expect(imposters.length).toEqual(1);
        scope.home.addImposter();
        expect(imposters.length).toEqual(2);

        scope.home.currentImposterIdx = 1;
        scope.home.currentResponseIdx = 1;
        spyOn(window, 'confirm').and.returnValue(true);
        scope.home.deleteImposter();
        expect(imposters.length).toEqual(1);
        expect(scope.home.currentImposterIdx).toEqual(0);
        expect(scope.home.currentResponseIdx).toEqual(0);



    }));
    it('testAddDeleteImposterAndCancel', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        var imposters =
                scope.home.buffer.data.imposters;
        expect(imposters.length).toEqual(1);
        scope.home.addImposter();
        expect(imposters.length).toEqual(2);

        scope.home.currentImposterIdx = 1;
        scope.home.currentResponseIdx = 1;
        spyOn(window, 'confirm').and.returnValue(false);
        scope.home.deleteImposter();
        expect(imposters.length).toEqual(2);
        expect(scope.home.currentImposterIdx).toEqual(1);
        expect(scope.home.currentResponseIdx).toEqual(1);



    }));

    it('testChangeImposter', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        var imposters =
                scope.home.buffer.data.imposters;
        expect(imposters.length).toEqual(1);
        scope.home.addImposter();
        expect(imposters.length).toEqual(2);

        scope.home.currentImposterIdx = 1;
        scope.home.currentResponseIdx = 1;

        scope.home.changeImposter(55);

        expect(scope.home.currentImposterIdx).toEqual(55);
        expect(scope.home.currentResponseIdx).toEqual(0);



    }));

    it('testChangeCollection', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        // expect(harness.imposterTest.newCollection.length).toEqual(2);

        scope.home.currentImposterIdx = 1;
        scope.home.currentResponseIdx = 1;
        scope.home.collectionSelectorIdx = 1;
        scope.home.changeCollection();

        expect(scope.home.currentImposterIdx).toEqual(0);
        expect(scope.home.currentResponseIdx).toEqual(0);



    }));

    it('testFormatInjection', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        spyOn(window,'js_beautify').and.callThrough();

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        // expect(harness.imposterTest.newCollection.length).toEqual(2);
        var item = {"body": "var x = {'ted':100}"};
        
         
        scope.home.formatInjection(item);
        //console.log("body "+item.body)
        expect(item.body.indexOf("\n") > 0).toBeTruthy();




    }));

it('testDoHelpDisplay', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems,$uibModal, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        spyOn($uibModal,'open') ;

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

         
        //http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/
         
        scope.home.doHelpDisplay('fred');
        //obj.method.mostRecentCall.args
        var calledWith = angular.toJson($uibModal.open.calls.mostRecent().args)
        expect(calledWith.indexOf("fred") > 0).toBeTruthy();




    }));

});

