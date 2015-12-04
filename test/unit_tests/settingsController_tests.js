/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('settingsController_tests.js -- Settings', function () {

    var collection;

    var temp = angular.copy(harness.imposterTest.newCollection[0]);
    collection = angular.copy(harness.imposterTest.newCollection);
    collection.push(temp);
    collection[0].port = 0;
    collection[1].port = 1;

    beforeEach(function ()
    {
        module('myApp');
        module(function ($provide) {

            function currentImposterFunction()
            {
                return collection[0];

            }

            function collectionItemsFunction()
            {


                return [];
            }


            $provide.factory('currentImposter', [currentImposterFunction]);
            $provide.factory('collectionItems', [collectionItemsFunction]);
        });

    });

    it('should test the settings controller', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(scope.settings.collectionItems.length).toEqual(0);
        expect(scope.settings.currentImposter.port).toEqual(0);

    }));

    it('testChangeCollection()', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        //expect(scope.settings.collectionItems.length).toEqual(2);

        spyOn(ImpostersService, 'setCollectionTo');

        expect(scope.settings.collectionSelectorIdx).toEqual("0");
        expect(scope.settings.currentCollectionIdx).toEqual(0);
        scope.settings.collectionSelectorIdx = "1";
        scope.settings.changeCollection();
        expect(scope.settings.currentCollectionIdx).toEqual(1);
        expect(ImpostersService.setCollectionTo.calls.count()).toEqual(1);

        // expect(scope.settings.currentImposter.port).toEqual(1);


    }));


    it('testUpdateList()', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(scope.settings.collectionItems.length).toEqual(0);

        spyOn(ImpostersService, 'getCollectionItems').and.returnValue(["fred", "ted"]);
        scope.settings.updateList();
        expect(scope.settings.collectionItems.length).toEqual(2);
        expect(ImpostersService.getCollectionItems.calls.count()).toEqual(1);

        // expect(scope.settings.currentImposter.port).toEqual(1);


    }));

    it('testDeleteCollectionAndCancel', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        var counter = 0;

        spyOn(ImpostersService, 'getCollectionItems').and.callFake(function ()
        {
            if (counter === 0)
            {
                counter = 1;
                return ["fred"];
            }

            return ["fred", "ted"];

        });
        spyOn(window, 'alert');
        scope.settings.deleteCollection();
        expect(window.alert).toHaveBeenCalledWith("Cannot delete last item in collection");

        scope.settings.currentCollectionIdx = 1;



        // expect(scope.currentCollectionIdx).toEqual(0)
        // expect(scope.settings.currentImposter.port).toEqual(1);
        var confCounter = 0;
        spyOn(ImpostersService, 'deleteCollectionAt')
        spyOn(window, 'confirm').and.callFake(function ()
        {
            if (confCounter == 0)
            {
                confCounter = 1;
                return true;
            }
            return false;

        });
        scope.settings.deleteCollection();
        expect(window.confirm).toHaveBeenCalledWith("Delete Collection 'New Imposter Description 0' ?");
        expect(scope.settings.currentCollectionIdx).toEqual(0);
        expect(ImpostersService.deleteCollectionAt).toHaveBeenCalledWith(1);
        scope.settings.deleteCollection();

    }));



    it('testCreateNewCollection()', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        scope.settings.currentImposter = null;
        spyOn(ImpostersService,'save');

        scope.settings.createNewCollection();
        expect(scope.settings.currentImposter == null).toBeFalsy();
        $rootScope.$apply();
        expect(ImpostersService.save.calls.any()).toEqual(true);

    }));


    it('testCreateNewCollectionAndError()', inject(function ($controller, ImpostersService,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var headerLocation = HEADER_LOCATION;

        var ctrl = $controller('SettingsCtrl as settings', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        scope.settings.currentImposter = null;
        spyOn(ImpostersService,'save').and.throwError("bonzo");

        scope.settings.createNewCollection();
        //expect(scope.settings.currentImposter == null).toBeFalsy();
        $rootScope.$apply();
        expect(ImpostersService.save.calls.any()).toEqual(true);
        expect(scope.settings.errorMessage.indexOf('bonzo') > -1).toBeTruthy();

    }));

});

 