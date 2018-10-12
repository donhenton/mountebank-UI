angular.module('app.services').factory('MountebankService', mountebankService);


function mountebankService($log, $http) {

  var exports =
        {
          "translate": translate,
          "postToMountebank": postToMountebank,
          "deleteFromMountebank": deleteFromMountebank
        }

//    function dataServiceError(errorResponse) {
//        $log.error('XHR Failed for MountebankService');
//        $log.error(errorResponse);
//        return errorResponse;
//    }

  /**
   * delete content from mountebank server at the given port
   * @param {type} port
   * @param {type} url
   * @returns {unresolved}
   */
  function deleteFromMountebank(url, port) {
    url = url.trim();
    var requestUrl = url + '/imposters/' + port;
    return $http({
      'url': requestUrl,
      'method': 'DELETE'
    }).then(function (response) {
      return response;
    });

  }


  /**
   * will call the mountebank server at url 
   * @param {type} url mountebank url
   * @param {type} body the json to send
   * @returns {unresolved} a promise which will return
   * the WHOLE response
   */
  function postToMountebank(url, body) {
    url = url.trim();
    var requestUrl = url + '/imposters';

    return $http({
      'url': requestUrl,
      'method': 'POST',
      'data': body,
      'headers': {
        'Content-Type': 'application/json'
      },
      'cache': false
    }).then(function (response) {
      return response;
    });
  }



  function isInteger(x) {
    var y;
    try {
      y = parseInt(x)
    } catch (e) {
      return false;
    }
    return (typeof y === 'number') && (y % 1 === 0);
  }


  /**
   * take the current imposter data and produce a mountebank payload
   * @param {type} data
   * @returns {mountebankService.exports} the mountebank json as a string
   */
  function translate(data) {

    var translated = {};
    translated.port = data.port;
    translated.protocol = "http";
    translated.stubs = [];


    if (data.useCORs) {
      
      translated.stubs.push(createOptionsStub(data));
    }
    
    if (data.addDefault) {
      var defAdd = null;
      try {
        defAdd = JSON.parse(data.defaultBody);
        translated.defaultResponse = defAdd;
      } catch (e) {
      }


    }  

    angular.forEach(data.imposters, function (imposter, idx) {


      var newStub = {"responses": [], "predicates": []};
      translated.stubs.push(newStub);
      angular.forEach(imposter.responses, function (response, idx) {
        if (response.injection.use) {

          newStub.responses.push({"inject": response.injection.body});
        } else {
          var headerVar = processHeaders(response.headers);


          var isResponse = {};
          if (headerVar !== null) {
            isResponse["headers"] = headerVar;
          }

          if (data.useCORs) {
            if (!isResponse["headers"]) {
              isResponse["headers"] = {};
            }
            isResponse["headers"]["Access-Control-Allow-Origin"] = data.CORsOrigin;
          }

          if (isInteger(response.status)) {
            isResponse["statusCode"] = response.status;
          }
          if (response.body.trim().length > 1) {
            isResponse["body"] = response.body;
          }
          var newResponse = {
            "is": isResponse
          };
          newStub.responses.push(newResponse);

          ////decorate ///////////////////////////////
          if (!response.decorate) {
            response.decorate = "";
          }
          if (response.decorate.trim().length > 1) {
            newResponse["_behaviors"] = {"decorate": response.decorate};
          }



          ////decorate /////////////////////////////// 

        }// end if not using injection for response
      })

      // predicates
      if (imposter.match.injection.use) {
        newStub.predicates.push({"inject": imposter.match.injection.body});

      } else {
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
        if (pathPredicate !== null) {
          mainAnd.push(pathPredicate);
        }

        //body
        var bodyPredicate = createPredicate("body", imposter.match.body_match);
        if (bodyPredicate !== null) {
          mainAnd.push(bodyPredicate);
        }
        //headers
        var headerVar = processHeaders(imposter.match.headers);

        if (headerVar !== null) {
          var headerMatch = {};
          headerMatch["headers"] = headerVar;
          mainAnd.push({"equals": headerMatch});
        }
        // imposter.match.query_params=[];
        if (imposter.match.query_params.length > 0) {
          //query params
          var queryVar = {"query": {}};
          var deepEqualsVar = {"deepEquals": queryVar};
          mainAnd.push(deepEqualsVar);


          angular.forEach(imposter.match.query_params, function (parm, idx) {
            var key = parm.key;
            if (key !== null && key.trim().length > 0) {
              queryVar.query[parm.key] = parm.value;
            }

          });

        }
      }//end if no injection for predicates

    });


    return angular.toJson(translated, true);
  }

  /**
   * process an array of header variables and return the total
   * @param {type} headerArray
   * @returns {unresolved}
   */
  function processHeaders(headerArray) {
    var headerVar = {};
    if (headerArray === null || headerArray.length === 0) {
      return null;
    }
    angular.forEach(headerArray, function (header, idx) {
      var key = header.key;
      if (key !== null && key.trim().length > 0) {
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
  function createPredicate(predicateType, matchInfo) {
    var type = matchInfo.type;
    var negate = false;
    if (type.indexOf("not") === 0) {
      type = type.slice(3).trim();
      negate = true;
    }
    var value = null;
    var predicate = {};
    var tempPredicate = {};
    if (predicateType === 'path') {
      value = matchInfo.value;

    } else {
      value = matchInfo.body;

    }
    if (!value) {
      value = null;
    }

    if (value === null || value.trim().length === 0) {
      return null;
    }

    tempPredicate[type] = {};
    tempPredicate[type][predicateType] = value;
    if (negate) {
      predicate["not"] = tempPredicate;
    } else {
      predicate = tempPredicate;
    }


    return predicate;

  }

//////////// CORS //////////////////////////////////////////////

  function createOptionsStub(data) {

    var optionStub =
          {
            "responses": [
              {
                "is": {
                  "headers": {
                    "Access-Control-Allow-Headers": "Content-Type,x-request-sample",
                    "Access-Control-Allow-Origin": "you-didn't specifiy a CORsOrigin ",
                    "Access-Control-Allow-Credentials": "true",
                    "Allow": "GET,POST,DELETE,PUT,PATCH",
                    "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,PATCH"
                  },
                  "statusCode": 200
                }
              }
            ],
            "predicates": [
              {
                "and": [
                  {
                    "equals": {
                      "method": "OPTIONS"
                    }
                  }
                ]
              }
            ]
          }

    var optionStubCopy = angular.copy(optionStub);
    optionStubCopy.responses[0].is.headers["Access-Control-Allow-Origin"]
          = data.CORsOrigin;
    optionStubCopy.responses[0].is.headers["Access-Control-Allow-Headers"]
          = data.allowedCORsHeaders;
    optionStubCopy.responses[0].is.headers["Access-Control-Allow-Methods"]
          = data.allowedCORsMethods;
    optionStubCopy.responses[0].is.headers["Allow"]
          = data.allowedCORsMethods;
    return optionStubCopy;

  }


  return exports;
}


// http://www.mbtest.org/docs/api/predicates

             