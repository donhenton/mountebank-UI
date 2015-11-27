/* global expect */

describe('Home Pages', function () {

    var testCollection = {
        "port": 9999,
        "id": 1,
        "description": "Test Collection",
        "imposters": [
            {
                "responses": [
                    {
                        "status": 200,
                        "headers": [],
                        "body": "bonzo"
                    }
                ],
                "match": {
                    "path_match": {
                        "type": "equals",
                        "value": "path"
                    },
                    "verb": "GET",
                    "headers": [],
                    "query_params": [],
                    "body_match": {
                        "type": "equals",
                        "body": "body"
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

//                function getCurrentImposter()
//                {
//                    return {};
//                }
//                var exports = {"getCurrentImposter": getCurrentImposter};
//
//
//                return exports;
                return testCollection;
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
        expect(scope.home.buffer.data.id).toEqual(1);
        expect(scope.home.headerLocation).toEqual(headerLocation);


    }));
 
    it('test ImpostersService', inject(function ($controller,
            currentImposter, collectionItems, $rootScope, TPL_PATH, HEADER_LOCATION) {
        var parentScope = $rootScope.$new();
        var scope = parentScope.$new();
        headerLocation = HEADER_LOCATION;

        var ctrl = $controller('HomeCtrl as home', {
            $scope: scope,
            collectionItems: collectionItems,
            currentImposter: currentImposter
        });
        expect(typeof scope.home.addResponse).toEqual('function');

    }));
   

});
