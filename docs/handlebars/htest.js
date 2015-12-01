


function processRequest(request, logger) {

     
    var handlebars = require('handlebars');
    var JSON = require("JSON3")
    var sentIn = JSON.stringify(request,null);
   //  logger.info('sentIn');
    
    var source = '{"book": "{{title}}","publication": {{year}}, "ISBN": "{{random}}" }';
    var ran = Math.floor(1053 + Math.random() * 124 + .5) + "-ADGJK-" + Math.floor(1057 + Math.random() * 124 + .5)

    var data = {
        "title": "Anne of Green Gables",
        "year": 1985,
        "random": ran
    };

    var template = handlebars.compile(source);
    var textJSON = template(data);
    //var jj = JSON.parse(html)
    // console.log(html);


    return {
        headers: {
            'Content-Type': 'application/json'
        },
        body: textJSON,
        statusCode: 200
    };
}
var t = processRequest();
console.log(JSON.stringify(t,null,2))