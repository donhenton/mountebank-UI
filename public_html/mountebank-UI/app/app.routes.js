angular.module('app.routes', ['ngRoute', 'app.constants'])



        .config(function ($routeProvider, TPL_PATH) {
            $routeProvider.when('/', {
                controller: 'HomeCtrl',
                controllerAs: 'home',
                templateUrl: TPL_PATH + 'sections/home/home.tpl.html',
                
                resolve: {
                    currentImposter: function ($route,$log,ImpostersService) {
                         
                         return ImpostersService.getCurrentImposter();
                    }

                }

            })
            .when('/settings', {
                controller: 'SettingsCtrl',
                controllerAs: 'settings',
                templateUrl: TPL_PATH + 'sections/settings/settings.tpl.html' ,
                
                resolve: {
                    currentImposter: function ($route,$log,ImpostersService) {
                         
                         return ImpostersService.getCurrentImposter();
                    }

                }
            })
            .when('/json', {
                controller: 'JsonCtrl',
                controllerAs: 'json',
                templateUrl: TPL_PATH + 'sections/settings/settings.tpl.html',
                
                resolve: {
                    currentImposter: function ($route,$log,ImpostersService) {
                         
                         return ImpostersService.getCurrentImposter();
                    }

                } 
            })

            .otherwise({
                redirectTo: '/'
            });

        });
