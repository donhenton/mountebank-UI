describe('headersDirective_tests.js -- headers', function () {

  // http://thejsguy.com/2015/02/12/unit-testing-angular-directives.html
    
    
    var container;
    var rootScope;
    var scope;


    beforeEach(function ()
    {
        module('myApp');
        angular.mock.module('templates');

        module(function ($provide) {

            $provide.constant('TPL_PATH', 'public_html/mountebank-UI/');


        });



    });

    it('testLoadingWithScope', inject(function ($compile, $rootScope) {

        container = angular.element('<div><headers customize="customizeTest" array="array"></headers></div>')
        scope = $rootScope.$new();


        scope.customizeTest = {keyLabel: 'keyLabel', headerText: 'text'};
        scope.array = [{'key': 'ted', 'value': '100'},{'key': 'fred', 'value': '200'}];
        $compile(container)(scope);
        scope.$digest();
        //console.log(container.html())
         var findKey = container.html().indexOf("keyLabel");
         expect(findKey > 0).toEqual(true);

    }));

    it('testLoadingWithOutScope', inject(function ($compile, $rootScope) {

        container = angular.element('<div><headers customize="customize" array="testArray"></headers></div>')
        scope = $rootScope.$new();
        
        scope.testArray = [{'key': 'ted', 'value': '100'},{'key': 'fred', 'value': '200'}];
        $compile(container)(scope);
        scope.$digest();

         var findKey = container.html().indexOf("Key");
         expect(findKey >0).toEqual(true);


    }));
    
    it('testAddResponseHeader', inject(function ($compile, $rootScope) {

        container = angular.element('<headers customize="customize" array="testArray"></headers>')
        scope = $rootScope.$new();
        
        scope.testArray = [{'key': 'ted', 'value': '100'},{'key': 'fred', 'value': '200'}];
        var element = $compile(container)(scope);
         
        scope.$digest();
        expect(typeof element.isolateScope()).toEqual('object');
        var isolatedScope = element.isolateScope();
        isolatedScope.addResponseHeader();
        expect(isolatedScope.array.length).toEqual(3);
        
        spyOn(window,'confirm').and.returnValue(false);
        
        //window confirm defaults to false here
        isolatedScope.deleteResponseHeader();
        expect(isolatedScope.array.length).toEqual(3);

    }));
    
     it('testDeleteResponseHeader', inject(function ($compile, $rootScope) {

        container = angular.element('<headers customize="customize" array="testArray"></headers>')
        scope = $rootScope.$new();
        
        scope.testArray = [{'key': 'ted', 'value': '100'},{'key': 'fred', 'value': '200'}];
        var element = $compile(container)(scope);
         
        scope.$digest();
        expect(typeof element.isolateScope()).toEqual('object');
        var isolatedScope = element.isolateScope();
        isolatedScope.addResponseHeader();
        expect(isolatedScope.array.length).toEqual(3);
          spyOn(window,'confirm').and.returnValue(true);
        isolatedScope.deleteResponseHeader();
        expect(isolatedScope.array.length).toEqual(2);

    }));
    
    
});

 