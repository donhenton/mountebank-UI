angular.module('app.services').factory('MountebankService', mountebankService);


function mountebankService($log)
{

    var exports =
            {
                "translate": translate
            }
    /**
     * take the current imposter data and produce a mountebank payload
     * @param {type} data
     * @returns {mountebankService.exports} the mountebank json as a string
     */
    function translate(data)
    {
        return "get a job";
    }

    return exports;
}