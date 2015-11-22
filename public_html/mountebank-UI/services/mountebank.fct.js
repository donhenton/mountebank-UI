angular.module('app.services').factory('MountebankService', mountebankService);


function mountebankService($log)
{

    var exports =
            {
                "translate": translate
            }

    function isInteger(x) {
        try {
            var y = parseInt(x)
        } catch (e) {
        }
        return (typeof y === 'number') && (y % 1 === 0);
    }


    /**
     * take the current imposter data and produce a mountebank payload
     * @param {type} data
     * @returns {mountebankService.exports} the mountebank json as a string
     */
    function translate(data)
    {

        var translated = {};
        translated.port = data.port;
        translated.protocol = "http";
        translated.stubs = [];
        angular.forEach(data.imposters, function (imposter, idx)
        {
            var newStub = {"responses": [], "predicates": []}
            translated.stubs.push(newStub);
            //responses
            angular.forEach(imposter.responses, function (response, idx)
            {
                var headerVar = processHeaders(response.headers);
                var isResponse = {};
                if (headerVar !== null)
                {
                    isResponse["headers"] = headerVar;
                }
                if (isInteger(response.status))
                {
                    isResponse["statusCode"] = response.status;
                }
                if (response.body.trim().length > 1)
                {
                    isResponse["body"] = response.body;
                }
                var newResponse = {
                    "is": isResponse
                };
                newStub.responses.push(newResponse);
            })

            // predicates

            newStub.predicates.push({"and": []});
            var mainAnd = newStub.predicates[0].and;
            //method
            var methodPredicate = {
                "equals": {
                    "method": imposter.match.verb
                }
            };
            mainAnd.push(methodPredicate);
            //path
            var pathPredicate = createPredicate("path", imposter.match.path_match);
            if (pathPredicate !== null)
            {
                mainAnd.push(pathPredicate);
            }

            //body
            var bodyPredicate = createPredicate("body", imposter.match.body_match);
            if (bodyPredicate !== null)
            {
                mainAnd.push(bodyPredicate);
            }
            //headers


        });


        return angular.toJson(translated, true);
    }

    /**
     * process an array of header variables and return the total
     * @param {type} headerArray
     * @returns {unresolved}
     */
    function processHeaders(headerArray)
    {
        var headerVar = {};
        if (headerArray === null || headerArray.length === 0)
        {
            return null;
        }
        angular.forEach(headerArray, function (header, idx)
        {
            var key = header.key;
            if (key !== null && key.trim().length > 0)
            {
                headerVar[header.key] = header.value;
            }

        });

        return headerVar;
    }




    /**
     * create predicates for body and path
     * @param {type} predicateType eg path or body
     * @param {type} matchInfo
     * @returns {undefined}
     */
    function createPredicate(predicateType, matchInfo)
    {
        var type = matchInfo.type;
        var negate = false;
        if (type.indexOf("not") === 0)
        {
            type = type.slice(3).trim();
            negate = true;
        }
        var value = null;
        var predicate = {};
        var tempPredicate = {};
        if (predicateType === 'path')
        {
            value = matchInfo.value;
        }
        else
        {
            value = matchInfo.body;

        }
        if (value === null || value.trim().length === 0)
        {
            return null;
        }

        tempPredicate[type] = {};
        tempPredicate[type][predicateType] = value;
        if (negate)
        {
            predicate["not"] = tempPredicate;
        }
        else
        {
            predicate = tempPredicate;
        }


        return predicate;

    }



    return exports;
}

/*
 newStub.predicates
 * 'matches', 'equals', 'contains','not equals','not contains'
 
 "predicates": [
 {
 "and": [
 {
 "contains": {
 "path": "bozo"
 }
 },
 {
 "deepEquals": {
 "query": {"fred": 1}
 }
 },
 {
 "equals": {
 "method": "GET"
 }
 } 
 ]
 }
 ]
 
 
 * 
 * 'matches', 'equals', 'contains','not equals','not contains'
 and together each of path, body, mehhtod headers
 path optional  equals contains, matches
 body optional  equals, contains, matches
 method required
 headers if array is empty drop out
 http://www.mbtest.org/docs/api/predicates
 */
             