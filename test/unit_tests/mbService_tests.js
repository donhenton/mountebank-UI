/* global harness */

describe('mbServiced_tests.js -- Mountebank Service', function () {

    /* 
     * 
     *  harness data is defined in test/data/imposter_data.js It is global here
     */


    beforeEach(function ()
    {
        module('myApp');
        module(function ($provide) {


        });
        

    });


    it('Mountebank Service And Harness Should be Available', inject(function (MountebankService) {

        expect(MountebankService).toBeDefined();
        expect(harness.imposterCollection[0]).toBeDefined();

    }));

    it('Restaurant Collection Comparison', inject(function (MountebankService) {

        var input = harness.imposterCollection[0];
        var expectedOutput = angular.toJson(harness.expected[0], false);
        var actualOutput = angular.toJson(angular.fromJson(MountebankService.translate(input)), false);
        var dist = harness.getEditDistance(expectedOutput, actualOutput);
        expect(dist).toEqual(1);
        
        

    }));

    it('Inject Comparison', inject(function (MountebankService) {

        var input = harness.imposterCollection[1];
        var expectedOutput = angular.toJson(harness.expected[1], false);
        var actualOutput = angular.toJson(angular.fromJson(MountebankService.translate(input)), false);
        var dist = harness.getEditDistance(expectedOutput, actualOutput);
        expect(dist).toEqual(0);
         

    }));
});
