

angular.module('app.services').factory('ImpostersService', impostersService);
function impostersService($log, localStorageService, $rootScope)
{
    var currentCollectionIdx = 0;
    var currentCollectionPort = 0;


    var exports =
            {
                "getCurrentImposter": getCurrentImposter,
                "getCollectionItems": getCollectionItems
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


    function getEmptyData()
    {
        //TODO implement this
    }

    //TODO if this function returns null, then return a new emptyData

    var collection =
            [{
                    "port": 3445,
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
                                                "path": "products/1",
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
                                                "path": "products/55",
                                                "verb": "POST",
                                                "headers": [{key: "user1", "value": "elmo201"}, {key: "user2", "value": "elmo202"}, {key: "user3", "value": "elmo203"}],
                                                "body_match":
                                                        {
                                                            "type": "regex",
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
                                                "path": "products?id=905&product_line=food",
                                                "verb": "GET",
                                                "headers": [],
                                                "body_match":
                                                        {
                                                            "type": "regex",
                                                            "body": "*search2*"
                                                        }
                                            }
                                }
                            ]

                }]




    function getCurrentImposter()
    {
        return collection[0];
    }






    return exports;
}
;





 