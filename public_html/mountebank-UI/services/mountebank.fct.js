angular.module('app.services').factory('MountebankService', mountebankService);


function mountebankService($log, ImpostersService)
{
    
      var exports =
            {
                 
                "save": save
            }

    /**
     * persist to local storage
     * @returns {undefined}
     */
    function save()
    {

    }
    
    return exports;
}