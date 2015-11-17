angular.module('myApp', ['ngRoute', 'app.homePages'])

  .constant('TPL_PATH', '/angular-sample/public_html/angular-sample/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/',{
      controller : 'HomeCtrl',
      templateUrl : TPL_PATH + '/home.tpl.html'
    });
  });
