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
                var headerVar = {};
                angular.forEach(response.headers, function (header, idx)
                {
                    headerVar[header.key] = header.value;
                });

                var newResponse = {
                    "is": {
                        "statusCode": response.status,
                        "headers": headerVar,
                        "body": response.body


                    }
                };
                newStub.responses.push(newResponse);
            })

            // predicates
            var newPredicate = {};
            var matchHeaders = {};
            angular.forEach(imposter.match.headers, function (header, idx)
            {
                matchHeaders[header.key] = header.value;
            });
            newPredicate[imposter.match.body_match.type] =
                    {
                        "path": imposter.match.path,
                        "body": imposter.match.body_match.body,
                        "method": imposter.match.verb,
                        "headers": matchHeaders



                    }
            newStub.predicates.push(newPredicate);

        });


        return angular.toJson(translated, true);
    }

    return exports;
}

/*
 
 
 
 
 {
 "port": 7777,
 "protocol": "http",
 "stubs": [{
 "responses": [
 {
 "is": {
 "statusCode": 200,
 "headers":
 {
 "bonzo": "dog"
 },
 "body": "{\"answer\": \"get a job\"}"
 
 
 }
 },
 {
 "is": {
 "statusCode": 200,
 "headers":
 {
 "bonzo": "dog"
 },
 "body": "{\"answer\": \"get another job\"}"
 
 
 }
 }
 ],
 "predicates": [{
 "and": [
 {
 "equals": {
 "path": "/test",
 "body":"{\"alpha\": 25}",
 "method": "POST",
 "headers": {
 "Content-Type": "application/json"
 }
 }
 } 
 ]
 }]
 }]
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 */