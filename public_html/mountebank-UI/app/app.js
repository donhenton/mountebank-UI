angular.module('myApp', ['ngRoute',  'app.constants','app.services','ui.bootstrap'])

  

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/',{
      controller : 'HomeCtrl',
      controllerAs: 'home',
      templateUrl : TPL_PATH + 'sections/home.tpl.html'
    });
  });
