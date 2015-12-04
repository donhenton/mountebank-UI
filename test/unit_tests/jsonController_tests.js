/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('jsonController_tests.js -- Json', function () {

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

            function mounteBankDisplayFunction()
            {
                return "get a job";

            }




            $provide.factory('currentImposter', [currentImposterFunction]);
            $provide.factory('mounteBankDisplay', [mounteBankDisplayFunction]);

        });

    });

    it('should test the json controller', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();


        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        expect(scope.json.currentImposter.port).toEqual(0);

    }));

    it('testDeleteFromMountbank200', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 200};
        var response200 = $q.when(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'deleteFromMountebank').and.returnValue(response200);
        scope.json.deleteFromMountebank();
        $rootScope.$digest();
        // spyOn(ImpostersService, 'getCollectionItems').and.returnValue(["fred", "ted"]);
        expect(MountebankService.deleteFromMountebank).toHaveBeenCalledWith('http://localhost:2525', 0);
        expect(scope.json.message.indexOf("Successful")).toEqual(0);



    }));

    it('testPostToMountbank201', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 201};
        var response201 = $q.when(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'postToMountebank').and.returnValue(response201);
        scope.json.postToMountbank();
        $rootScope.$digest();
        // spyOn(ImpostersService, 'getCollectionItems').and.returnValue(["fred", "ted"]);
        expect(MountebankService.postToMountebank).toHaveBeenCalledWith('http://localhost:2525', 'get a job');
        expect(scope.json.message.indexOf("Successful")).toEqual(0);



    }));

    it('testDeleteFromMountbank500', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 500};
        var response200 = $q.when(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'deleteFromMountebank').and.returnValue(response200);
        scope.json.deleteFromMountebank();
        $rootScope.$digest();
        // spyOn(ImpostersService, 'getCollectionItems').and.returnValue(["fred", "ted"]);
        expect(MountebankService.deleteFromMountebank).toHaveBeenCalledWith('http://localhost:2525', 0);
        expect(scope.json.message.indexOf("Successful")).toEqual(-1);



    }));

    it('testPostToMountbank500', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 500};
        var response200 = $q.when(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'postToMountebank').and.returnValue(response200);
        scope.json.postToMountbank();
        $rootScope.$digest();

        expect(scope.json.message.indexOf("Successful")).toEqual(-1);



    }));

    it('testDeleteFromMountbankError', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": -1};
        var responseError = $q.reject(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'deleteFromMountebank').and.returnValue(responseError);
        scope.json.deleteFromMountebank();
        $rootScope.$digest();

        expect(scope.json.message.indexOf("Error")).toEqual(0);



    }));

    it('testPostToMountbankError500', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 500,"statusText":"smurf"};
        var responseError = $q.reject(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'postToMountebank').and.returnValue(responseError);
        scope.json.postToMountbank();
        $rootScope.$digest();
        expect(scope.json.message.indexOf("Error")).toEqual(0);
        expect(scope.json.message.indexOf(rItem.statusText)> 0).toBeTruthy();


    }));

it('testPostToMountbankErrorMinusOne', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": -1,"statusText":"smurf"};
        var responseError = $q.reject(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'postToMountebank').and.returnValue(responseError);
        scope.json.postToMountbank();
        $rootScope.$digest();
        expect(scope.json.message.indexOf("Error")).toEqual(0);
        expect(scope.json.message.indexOf("CORS")> 0).toBeTruthy();


    }));
    
    it('testPostToMountbankError400', inject(function ($controller,
            currentImposter, MountebankService, mounteBankDisplay, $q, $rootScope) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        var rItem = {"status": 400,"statusText":"smurf"};
        var responseError = $q.reject(rItem);

        $controller('JsonCtrl as json', {
            $scope: scope,
            mounteBankDisplay: mounteBankDisplay,
            currentImposter: currentImposter
        });

        spyOn(MountebankService, 'postToMountebank').and.returnValue(responseError);
        scope.json.postToMountbank();
        $rootScope.$digest();
        expect(scope.json.message.indexOf("Error")).toEqual(0);
        expect(scope.json.message.indexOf("per session")> 0).toBeTruthy();


    }));

});

 