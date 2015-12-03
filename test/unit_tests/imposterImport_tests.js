/* global harness */

describe('imposterImport_tests.js -- Imposters Service', function () {

    /* 
     * 
     *  harness data is defined in test/data/imposter_data.js It is global here
     */

    var localStorageServiceRef;
    var impServiceRef;
    var LS_KEY = "mountebank_collection";
    var LS_KEY_TEMP = LS_KEY + "_temp";
    var newCollection;
    beforeAll(function ()
    {
        //cannot be used for angular stuff https://github.com/angular/angular.js/issues/10238

    })


    beforeEach(function ()
    {



        module('myApp', function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('testing2');
            localStorageServiceProvider.setStorageType('sessionStorage');

        });


        inject(function (localStorageService, ImpostersService) {

            localStorageServiceRef = localStorageService;
            impServiceRef = ImpostersService;




        });
    });

/**
 * this test shows that you have to set the index to zero when handling
 * this scenario
 * its done in the home controller
 * 
 * @param {type} ImpostersService
 * @returns {undefined}
 */

    it('Set the index on larger then import smaller',
            inject(function (ImpostersService) {

                var collectionOneStr = ImpostersService.exportCollection();
                var collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(1);
                impServiceRef.createNewCollection();
                collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(2);
                ImpostersService.setCollectionTo(1);
                
                ImpostersService.importCollection(collectionOneStr);
                collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(1);

                var currentImposter = ImpostersService.getCurrentImposter();
                expect(currentImposter).toBeUndefined();
            


            }));

});
