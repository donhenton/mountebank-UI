angular.module('myApp', ['ngRoute', 'app.homePages'])

  .constant('TPL_PATH', '/mountebank-UI/public_html/mountebank-UI/templates')

  .config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/',{
      controller : 'HomeCtrl',
      controllerAs: 'home',
      templateUrl : TPL_PATH + '/home.tpl.html'
    });
  });
