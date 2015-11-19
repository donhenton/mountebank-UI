

angular.module('app.services').factory('ImpostersService', impostersService);
function impostersService($log, localStorageService, $rootScope)
{
    var exports =
            {
                "getData": getData
            }


    function getEmptyData()
    {
        //TODO implement this
    }

    function getData(key)
    {

        //TODO if this function returns null, then return a new emptyData

        var data=
                {
                    "port": 3445,
                    "imposters":
                            [{
                                    "response":
                                            {
                                                "status": 200,
                                                "headers": {
                                                    "user": "elmo",
                                                    "bonzo":"fred"
                                                },
                                                "body": {
                                                    "id": 34,
                                                    "product": "ice cream"
                                                }
                                            },
                                    "match":
                                            {
                                                "path": "products/1",
                                                "verb": "POST",
                                                "headers": {
                                                    "user": "elmo"
                                                },
                                                "body_match":
                                                        {
                                                            "type": "equal",
                                                            "body": {
                                                                "search": "ice"
                                                            }
                                                        }
                                            }
                                }
                                ,
                                {
                                    "response":
                                            {
                                                "status": 450,
                                                "headers": {
                                                    "user": "elmo100"
                                                },
                                                "body": {
                                                    "id": 567,
                                                    "product": "coconuts"
                                                }
                                            },
                                    "match":
                                            {
                                                "path": "products/55",
                                                "verb": "POST",
                                                "headers": {
                                                    "user": "elmo"
                                                },
                                                "body_match":
                                                        {
                                                            "type": "regex",
                                                            "regex": "*search*"
                                                        }
                                            }
                                }
                                ,
                                {
                                    "response":
                                            {
                                                "status": 404,
                                                "headers": {},
                                                "body": {
                                                    "id": 23,
                                                    "product": "garbage"
                                                }
                                            },
                                    "match":
                                            {
                                                "path": "products?id=905&product_line=food",
                                                "verb": "GET",
                                                "headers": {},
                                                "body_match":
                                                        {
                                                            "type": "regex",
                                                            "regex": "*search*"
                                                        }
                                            }
                                }
                            ]

                }



                return data;


    }//end get data



    return exports;
}
;





 