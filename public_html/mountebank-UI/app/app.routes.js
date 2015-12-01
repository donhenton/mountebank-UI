angular.module('app.routes', ['ngRoute', 'app.constants'])



        .config(function ($routeProvider, TPL_PATH) {
            $routeProvider.when('/', {
                controller: 'HomeCtrl',
                controllerAs: 'home',
                templateUrl: TPL_PATH + 'sections/home/home.tpl.html',
                resolve: {
                    currentImposter: function ($route, $log, ImpostersService) {

                        return ImpostersService.getCurrentImposter();
                    },
                    collectionItems: function ($log, ImpostersService)
                    {
                        return ImpostersService.getCollectionItems();
                    }

                }

            })
                    .when('/settings', {
                        controller: 'SettingsCtrl',
                        controllerAs: 'settings',
                        templateUrl: TPL_PATH + 'sections/settings/settings.tpl.html',
                        resolve: {
                            currentImposter: function ($route, $log, ImpostersService) {

                                return ImpostersService.getCurrentImposter();
                            },
                            collectionItems: function ($log, ImpostersService)
                            {
                                return ImpostersService.getCollectionItems();
                            }

                        }
                    })
                    .when('/json', {
                        controller: 'JsonCtrl',
                        controllerAs: 'json',
                        templateUrl: TPL_PATH + 'sections/json/json.tpl.html',
                        resolve: {
                            currentImposter: function ($route, $log, ImpostersService) {

                                return ImpostersService.getCurrentImposter();
                            },
                            mounteBankDisplay: function ($log, ImpostersService, MountebankService)
                            {
                                var currentImposter = ImpostersService.getCurrentImposter();
                                return MountebankService.translate(currentImposter);
                            }

                        }
                    })
                    .when('/help', {
                        controller: 'MainHelpCtrl',
                        controllerAs: 'help',
                        templateUrl: TPL_PATH + 'sections/help/main_help.tpl.html' 
                    })
                     .when('/import', {
                        controller: 'ImportCtrl',
                        controllerAs: 'import',
                        templateUrl: TPL_PATH + 'sections/import/import.tpl.html' 
                    })
                    .otherwise({
                        redirectTo: '/'
                    });

        });
