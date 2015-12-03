/* global expect */
//http://jasmine.github.io/2.2/introduction.html
// promise mocking http://jsfiddle.net/lavinjj/zWkzP/light/
describe('homePage_tests.js -- Home Pages', function () {

    var sampleCollectionItem = {
        "port": 9999,
        "id": 35,
        "description": "Test Collection",
        "imposters": [
            {
                "responses": [
                    {
                        "status": 200,
                        "headers": [],
                        "body": "imposter 1"
                    }
                ],
                "match": {
                    "path_match": {
                        "type": "equals",
                        "value": "path"
                    },
                    "injection":
                            {
                                "use": false, "body": ""
                            },
                    "verb": "GET",
                    "headers": [],
                    "query_params": [],
                    "body_match": {
                        "type": "equals",
                        "body": "imposter 1"
                    }
                }
            }, {
                "responses": [
                    {
                        "status": 200,
                        "headers": [],
                        "body": "imposter 2"
                    }
                ],
                "match": {
                    "injection":
                            {
                                "use": false, "body": ""
                            },
                    "path_match": {
                        "type": "equals",
                        "value": "path"
                    },
                    "verb": "GET",
                    "headers": [],
                    "query_params": [],
                    "body_match": {
                        "type": "equals",
                        "body": "imposter 2"
                    }
                }
            }]
    };


    var headerLocation = null;

    beforeEach(function ()
    {
        module('myApp');
        module(function ($provide) {

            function currentImposterFunction()
            {
                return angular.copy(sampleCollectionItem);
//                function getCurrentImposter()
//                {
//                    return {};
//                }
//                var exports = {"getCurrentImposter": getCurrentImposter};
//
//
//                return exports;

            }

            function collectionItemsFunction()
            {
                return {};
            }


            $provide.factory('currentImposter', [currentImposterFunction]);
            $provide.factory('collectionItems', [collectionItemsFunction]);
        });

    });



    it('should test the homePages controller', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {

        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(typeof scope.home.errorMessage).toEqual("string");
        expect(scope.home.errorMessage).toEqual("");
        expect(scope.home.buffer.data.id).toEqual(35);
        expect(scope.home.headerLocation).toEqual(headerLocation);


    }));

    it('test ImpostersService with callthrough', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH,
            ImpostersService, HEADER_LOCATION) {
        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        spyOn(ImpostersService, 'getSampleResponse').and.callThrough();

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(typeof scope.home.addResponse).toEqual('function');

        var cRep = scope.home.currentResponseIdx;
        scope.home.addResponse();
        expect(cRep + 1).toEqual(scope.home.currentResponseIdx);
        expect(ImpostersService.getSampleResponse).toHaveBeenCalled();
        expect(
                scope.home.buffer.data
                .imposters[scope.home.currentImposterIdx]
                .responses[scope.home.currentResponseIdx].body)
                .toEqual("");

    }));

    var newResponse = {
        "status": 200,
        "headers": [],
        "body": "bonzo"
    }

    it('test ImpostersService with returnValue', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH,
            ImpostersService, HEADER_LOCATION) {
        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        spyOn(ImpostersService, 'getSampleResponse')
                .and.returnValue(newResponse);

        $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });


        var cRep = scope.home.currentResponseIdx;
        expect(cRep).toEqual(0)
        scope.home.addResponse();
        expect(cRep + 1).toEqual(scope.home.currentResponseIdx);
        expect(ImpostersService.getSampleResponse).toHaveBeenCalled();
        expect(
                scope.home.buffer.data
                .imposters[scope.home.currentImposterIdx]
                .responses[scope.home.currentResponseIdx].body)
                .toEqual("bonzo");

    }));


    it('test sortImposters with cancel using promise', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH,
            ImpostersService, HEADER_LOCATION, $uibModal, $q) {

        //$uibModal.open(

        var modalReturn = {"result": $q.when("cancel")};
        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        spyOn($uibModal, 'open')
                .and.returnValue(modalReturn);

        $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        scope.home.sortImposters();
        scope.$root.$digest();

        expect(currentImposter.imposters[0].responses[0].body).toEqual("imposter 1");

    }));




    it('test sortImposters with ok using promise', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH,
            ImpostersService, HEADER_LOCATION, $uibModal, $q) {

        var swappedImposters =
                [{"value": 1, "ref": sampleCollectionItem.imposters[1], "text": "Item 2"},
                    {"value": 0, "ref": sampleCollectionItem.imposters[0], "text": "Item 1"}
                ];

        var modalReturn = {"result": $q.when(swappedImposters)};
        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        spyOn($uibModal, 'open')
                .and.returnValue(modalReturn);

        $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        scope.home.sortImposters();
        scope.$root.$digest();

        expect(currentImposter.imposters[0].responses[0].body).toEqual("imposter 2");

    }));


    it('test isJson', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH,
            ImpostersService, HEADER_LOCATION, $uibModal, $q) {


        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });

        expect(scope.home.isJsonString("{}")).toBeTruthy();
        expect(scope.home.isJsonString("fred")).toBeFalsy();

    }));


});
