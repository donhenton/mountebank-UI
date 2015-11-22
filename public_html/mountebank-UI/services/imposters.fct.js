

angular.module('app.services').factory('ImpostersService', impostersService);


function impostersService($log, localStorageService, $rootScope)
{
    var currentCollectionIdx = 0;



    var exports =
            {
                "getCurrentImposter": getCurrentImposter,
                "getCollectionItems": getCollectionItems,
                "createNewCollection": createNewCollection,
                "setCollectionTo": setCollectionTo,
                "createNewImposter": createNewImposter,
                "deleteCollectionAt": deleteCollectionAt,
                "save": save
            }

    /**
     * persist to local storage
     * @returns {undefined}
     */
    function save()
    {
        //$log.debug("save called")
    }

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
        newCollection.id = newIdx
        newCollection.description = "New Imposter Description " + newIdx;
        newCollection.imposters = [];

        var newImposter = createNewImposter();
        newCollection.imposters.push(newImposter);


        collection.push(newCollection);
        currentCollectionIdx = newIdx;
        save();
    }

    function createNewImposter()
    {
        var newImposter = {};
        newImposter.responses =
                [{
                        "status": 200,
                        "headers": [],
                        "body": ""
                    }];
        newImposter.match =
                {
                    "path_match": {
                        "type": "equals",
                        "value": "path"
                    },
                    "verb": "GET",
                    "headers": [],
                    "body_match":
                            {
                                "type": "equals",
                                "body": "body"
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



    var collection =
            [{
                    "port": 3445,
                    "id": 0,
                    "description": "Sample Imposter Collection",
                    "imposters":
                            [{
                                    "responses": [
                                        {
                                            "status": 200,
                                            "headers": [{key: "alpha", "value": 34}, {key: "beta", "value": 79}],
                                            "body": "{ \"id\": 34, \"product\": \"ice cream\"}"


                                        }],
                                    "match":
                                            {
                                                "path_match":
                                                        {"value": "products/1", "type": "contains"},
                                                "verb": "POST",
                                                "headers": [{key: "user", "value": "elmo00"}],
                                                "body_match":
                                                        {
                                                            "type": "equals",
                                                            "body": "{  \"search\": \"ice cream\"}"
                                                        }
                                            }
                                }
                                ,
                                {
                                    "responses": [
                                        {
                                            "status": 450,
                                            "headers": [{key: "user", "value": "elmo200"}],
                                            "body": "{ \"id\": 77, \"product\": \"coconuts\"}"
                                        }],
                                    "match":
                                            {
                                                "path_match":
                                                        {"value": "products/55", "type": "equals"},
                                                "verb": "POST",
                                                "headers": [{key: "user1", "value": "elmo201"}, {key: "user2", "value": "elmo202"}, {key: "user3", "value": "elmo203"}],
                                                "body_match":
                                                        {
                                                            "type": "not contains",
                                                            "body": "*search1*"
                                                        }
                                            }
                                }
                                ,
                                {
                                    "responses":
                                            [{
                                                    "status": 404,
                                                    "headers": [],
                                                    "body": "{ \"id\": 77, \"product\": \"garbage\"}"
                                                }],
                                    "match":
                                            {
                                                "path_match":
                                                        {"value": "products/655", "type": "matches"},
                                                "verb": "GET",
                                                "headers": [],
                                                "body_match":
                                                        {
                                                            "type": "equals",
                                                            "body": "*search2*"
                                                        }
                                            }
                                }
                            ]

                }]




    function getCurrentImposter()
    {
        //$log.debug("getCurrentImposter "+currentCollectionIdx)
        return collection[currentCollectionIdx];
    }






    return exports;
}
;





 