describe('router_tests.js -- routers', function () {
    beforeEach(function ()
    {
        module('myApp', function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('testing4');
            localStorageServiceProvider.setStorageType('sessionStorage');

        });


    });

    it('testHomeRoute', function () {
        module('myApp');

        inject(function ($route, TPL_PATH, $log, ImpostersService, $injector) {

            var testVar = '/'
            spyOn(ImpostersService, 'getCurrentImposter').and.callThrough();
            spyOn(ImpostersService, 'getCollectionItems').and.callThrough();
            expect($route.routes[testVar].controller).toBe('HomeCtrl');
            expect($route.routes[testVar].templateUrl).
                    toEqual(TPL_PATH + 'sections/home/home.tpl.html');




            var currImpFunc = $route.routes[testVar].resolve.currentImposter;
            var collectionItemsFunc =
                    $route.routes[testVar].resolve.collectionItems;
            expect(typeof $route.routes[testVar].resolve.currentImposter)
                    .toEqual('function');

            var impResult = $injector.invoke(currImpFunc);
            var colResult = $injector.invoke(collectionItemsFunc);
            expect(impResult.port).toEqual(9999);
            expect(colResult.length).toEqual(1);


        });
    });


    it('testSettingsRoute', function () {
        module('myApp');

        inject(function ($route, TPL_PATH, $log, ImpostersService, $injector) {

            var testVar = '/settings';
            spyOn(ImpostersService, 'getCurrentImposter').and.callThrough();
            spyOn(ImpostersService, 'getCollectionItems').and.callThrough();
            expect($route.routes[testVar].controller).toBe('SettingsCtrl');
            expect($route.routes[testVar].templateUrl).
                    toEqual(TPL_PATH + 'sections/settings/settings.tpl.html');




            var currImpFunc = $route.routes[testVar].resolve.currentImposter;
            var collectionItemsFunc =
                    $route.routes[testVar].resolve.collectionItems;
            expect(typeof $route.routes[testVar].resolve.currentImposter)
                    .toEqual('function');

            var impResult = $injector.invoke(currImpFunc);
            var colResult = $injector.invoke(collectionItemsFunc);
            expect(impResult.port).toEqual(9999);
            expect(colResult.length).toEqual(1);


        });
    });

    it('testJsonRoute', function () {
        module('myApp');

        inject(function ($route, TPL_PATH, $log, MountebankService, ImpostersService, $injector) {

            var testVar = '/json';
            spyOn(ImpostersService, 'getCurrentImposter').and.callThrough();
            spyOn(ImpostersService, 'getCollectionItems').and.callThrough();
            spyOn(MountebankService, 'translate').and.returnValue('fred');
            expect($route.routes[testVar].controller).toBe('JsonCtrl');
            expect($route.routes[testVar].templateUrl).
                    toEqual(TPL_PATH + 'sections/json/json.tpl.html');




            var currImpFunc = $route.routes[testVar].resolve.currentImposter;
            var mountebankFunc =
                    $route.routes[testVar].resolve.mounteBankDisplay;
            expect(typeof $route.routes[testVar].resolve.currentImposter)
                    .toEqual('function');

            var impResult = $injector.invoke(currImpFunc);
            var mtResult = $injector.invoke(mountebankFunc);
            expect(impResult.port).toEqual(9999);
            expect(mtResult).toEqual('fred');


        });
    });




});