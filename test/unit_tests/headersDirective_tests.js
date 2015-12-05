describe('headersDirective_tests.js -- headers', function () {

    //http://jsfiddle.net/biomassives/z3mv7wgj/
    //http://busypeoples.github.io/post/testing-angularjs-hierarchical-directives/
    //https://gist.github.com/trodrigues/7414091
    //http://www.sitepoint.com/angular-testing-tips-testing-directives/
    var container;
    var rootScope;
    var scope;


    beforeEach(function ()
    {
        module('myApp');
        angular.mock.module('templates');

        inject(function ($rootScope, $compile,$httpBackend)
        {
          // console.log(typeof  $httpBackend.whenGET('http://localhost:9876/mountebank-UI/components/headers/headers.tpl.html'))  ;
            container = angular.element('<div><headers customize="fred" array="alpha"></headers></div>')
            scope = $rootScope.$new();
           // $httpBackend.whenGET(/^\/headers\//).passThrough();
           
            scope.fred = 'Get a job';
            scope.alpha = {'key': 'ted', 'value': 100}
            $compile(container)(scope);
            scope.$digest();
        });

    });

    it('should test header direct', inject(function ($controller, $rootScope ) {



        expect(3).toEqual(3);

    }));



});

 