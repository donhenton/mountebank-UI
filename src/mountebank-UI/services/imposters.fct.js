

angular.module('app.services').factory('ImpostersService', impostersService);


function impostersService($log, localStorageService, $rootScope)
{
    var currentCollectionIdx = 0;
    var collection = [];
    var LS_KEY = "mountebank_collection";

    var ls = localStorageService.get(LS_KEY);
    if (ls !== null) {
        collection = ls;
    }
    else
    {
        createNewCollection();

    }


    var exports =
            {
                "getCurrentImposter": getCurrentImposter,
                "getCollectionItems": getCollectionItems,
                "createNewCollection": createNewCollection,
                "setCollectionTo": setCollectionTo,
                "createNewImposter": createNewImposter,
                "deleteCollectionAt": deleteCollectionAt,
                "getSampleResponse": getSampleResponse,
                "exportCollection": exportCollection,
                "importCollection": importCollection,
                "getSampleDefaultBody": getSampleDefaultBody,
                "save": save
            }

    /**
     * persist to local storage
     * @returns {undefined}
     */
    function save()
    {
        localStorageService.set(LS_KEY, collection);
    }

    $rootScope.$watch(
            function () {
                return collection;
            },
            function () {
                save()
            },
            true);


    /**
     * 
     * @param {type} idx
     * @returns {undefined}
     */
    function deleteCollectionAt(idx)
    {
        // $log.debug("splice at "+idx+" "+collection.length)
        collection.splice(idx, 1);
        // $log.debug("collection now "+collection.length)
        save();
    }

    /**
     * set the new index into the collection
     * @param {type} newIdx
     * @returns {undefined}
     */
    function setCollectionTo(newIdx)
    {
        currentCollectionIdx = newIdx;
    }

    /**
     * create a new collection and position the Idx to point to it
     * @returns {undefined}
     */
    function createNewCollection()
    {
        var newCollection = {};
        var newIdx = collection.length;
        newCollection.port = 9999;
        newCollection.useCORs = false;
        newCollection.addDefault = false;
        newCollection.defaultBody = JSON.stringify(getSampleDefaultBody());
        newCollection.CORsOrigin = 'http://localhost:8383';
        newCollection.allowedCORsHeaders = 'application/json,Content-Type';
        newCollection.allowedCORsMethods = 'GET,POST,PUT,PATCH,DELETE';
        newCollection.id = newIdx;
        newCollection.description = "New Imposter Description " + newIdx;
        newCollection.imposters = [];

        var newImposter = createNewImposter();
        newCollection.imposters.push(newImposter);


        collection.push(newCollection);
        currentCollectionIdx = newIdx;
        save();
    }
    ;

    function getSampleResponse()
    {
        return {
            "status": 200,
            "injection": { "use": false, "body": ""} ,
            "headers": [],
            "body": "" 
            
        };
    }  ;
    
    
    function getSampleDefaultBody() {
      return {
        "statusCode": 200,
        "headers": {
          "connection": "close",
           
        } ,
        "body": "stuff"
      }
    }

    function createNewImposter()
    {
        var newImposter = {};
        var newResponse = getSampleResponse();
        newImposter.responses =
                [newResponse];
        newImposter.match =
                {
                    "path_match": {
                        "type": "equals",
                        "value": "path"
                    },
                    "injection": { "use": false, "body": ""},
                    "verb": "GET",
                    "headers": [],
                    "query_params":[],
                    "body_match":
                            {
                                "type": "equals",
                                "body": ""
                            }
                };

        return newImposter;

    }


    /**
     * used to fill the select box on the home page
     * @returns {Array|impostersService.getCollectionItems.items}
     */
    function getCollectionItems()
    {
        var items = [];
        var cc = 0;
        angular.forEach(collection, function (data)
        {
            var i = {};
            i.id = cc;
            i.selected = false;
            if (cc === currentCollectionIdx)
            {
                i.selected = true;
            }
            i.description = data.description;
            items.push(i);
            cc = cc + 1;
        });

        return items;
    }


    function getCurrentImposter()
    {
        //$log.debug("getCurrentImposter "+currentCollectionIdx)
        return collection[currentCollectionIdx];

    }


    function exportCollection()
    {
        return angular.toJson(angular.copy(collection),true);
    }

    function importCollection(collectionAsString)
    {
        collection = angular.fromJson(collectionAsString);
        //save should occur through the watch
    }


    return exports;
}
;





 