/* global harness */

describe('imposterService_tests.js -- Imposters Service', function () {

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
            localStorageServiceProvider.setPrefix('testing1');
            localStorageServiceProvider.setStorageType('sessionStorage');

        });


        inject(function (localStorageService, ImpostersService) {

            localStorageServiceRef = localStorageService;
            impServiceRef = ImpostersService;
            var collection = ImpostersService.getCollectionItems();
            if (collection.length === 1)
            {
                impServiceRef.createNewCollection();
            }



        });
    });



    it('Imposters Service And Harness Should be Available',
            inject(function (ImpostersService) {

                expect(ImpostersService).toBeDefined();
                expect(harness.imposterCollection[0]).toBeDefined();
                expect(localStorageServiceRef).toBeDefined();


            }));

    it('Should only be one item and be selected',
            inject(function (ImpostersService) {
                //this is the stuff for the home selection control
                var collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(2);
                var item = collection[1];
                expect(item.id).toEqual(1);
                expect(item.description).toEqual("New Imposter Description 1");
                expect(item.selected).toBeFalsy();

                item = collection[0];
                expect(item.id).toEqual(0);
                expect(item.description).toEqual("New Imposter Description 0");
                expect(item.selected).toBeTruthy();


            }));

    it('setCollectionTo Test',
            inject(function (ImpostersService) {

                ImpostersService.setCollectionTo(1);
                var collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(2);
                var item = collection[1];
                expect(item.id).toEqual(1);
                expect(item.description).toEqual("New Imposter Description 1");
                expect(item.selected).toBeTruthy();

                ImpostersService.setCollectionTo(0);
            }));


    it('getCurrentImposter Test',
            inject(function (ImpostersService) {
                ImpostersService.setCollectionTo(0);
                var expectedImposter = harness.imposterTest.newCollection[0];

                var currentImposter =
                        ImpostersService.getCurrentImposter();

                var expectedStr = angular.toJson(expectedImposter);
                var currentStr = angular.toJson(currentImposter);


                var dist = harness.getEditDistance(expectedStr, currentStr);
                expect(dist).toEqual(0);

            }));

    it('deleteCollectionAt Test',
            inject(function (ImpostersService) {


                ImpostersService.setCollectionTo(0);
                ImpostersService.deleteCollectionAt(1);
                var collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(1);
                var item = collection[0];
                expect(item.id).toEqual(0);
                expect(item.description).toEqual("New Imposter Description 0");
                expect(item.selected).toBeTruthy();

            }));

    it('Import/Export Test',
            inject(function (ImpostersService) {

                var collectionBeforeStr = ImpostersService.exportCollection();
                ImpostersService.setCollectionTo(0);
                ImpostersService.deleteCollectionAt(1);

                var exportedStuff = ImpostersService.exportCollection();
               // console.log("exported\n\n\n"+exportedStuff+"\n\n\n")
                var expectedStuffObj = harness.imposterTest.newCollection;
                var expectedStuff = angular.toJson(expectedStuffObj,true);
               // console.log("expected\n\n\n"+expectedStuff+"\n\n\n")
                
                var dist = harness.getEditDistance(exportedStuff, expectedStuff);
                expect(dist).toEqual(0);
                
                //now put it back
                
                ImpostersService.importCollection(collectionBeforeStr);
                var collection = ImpostersService.getCollectionItems();
                expect(collection.length).toEqual(2);
                

            }));


});
