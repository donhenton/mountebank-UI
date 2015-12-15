var simpleTest = {
  "port": "7777",
  "protocol": "http",
  "stubs": [
    {
      "responses": [
        {
          "is": {
            "headers": {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type"
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
    },
    {
      "responses": [
        {
          "is": {
            "headers": {
              "Content-type": "text/html",
              "Access-Control-Allow-Origin": "*"
            },
            "statusCode": 200,
            "body": "alpha The time is ${TIME}"
          },
          "_behaviors": {
            "decorate": "function(request, response) {\n    var pad = function(number) {\n            return (number < 10) ? '0' +\n                number : number.toString();\n        },\n        now = new Date(),\n        time = pad(now.getHours()) +\n        ':' + pad(now.getMinutes()) +\n        ':' + pad(now.getSeconds());\n\n    response.body = response.body\n        .replace('${TIME}', time + ' from alpha');\n}"
          }
        },
        {
          "is": {
            "headers": {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*"
            },
            "statusCode": 200,
            "body": "beta alpha The time is ${TIME}"
          },
          "_behaviors": {
            "decorate": "function(request, response) {\n    var pad = function(number) {\n            return (number < 10) ? '0' +\n                number : number.toString();\n        },\n        now = new Date(),\n        time = pad(now.getHours()) +\n        ':' + pad(now.getMinutes()) +\n        ':' + pad(now.getSeconds());\n\n    response.body = response.body\n        .replace('${TIME}', time + ' from beta');\n}"
          }
        }
      ],
      "predicates": [
        {
          "and": [
            {
              "equals": {
                "method": "POST"
              }
            },
            {
              "equals": {
                "body": "{\"alpha\":25}"
              }
            },
            {
              "equals": {
                "path": "/decorate"
              }
            }
          ]
        }
      ]
    }
  ]
} 