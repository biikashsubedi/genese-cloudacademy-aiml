var http = require('http');
exports.handler = function (event, ctx, callback) {
    const city = event.currentIntent.slots["City"];
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=be97ab389e6883a0097c72b91dab5ffc&units=metric';

    var res = http.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var responce = JSON.parse(body);
            console.log("Got a Weather responce: " + responce);
            var weather = "Current weather  in " + responce['name'] + " is: " + "temperature: " + Math.floor(responce.main['temp']) + " °C. " + responce.weather[0]["description"] + ", with humidity " + responce.main["humidity"] + "%, preasure ";
            weather += responce.main['pressure'] + " Hectopascal. "

            my_response = {};
            if (event.currentIntent.slots.City) {
                // we have the city already awesome keep going
            } else {
                //we need to ask for (elicit) a city
                my_response.statusCode = 200;
                my_response.body = {
                    "dialogAction": {
                        "type": "ElicitSlot",
                        "message": {
                            "contentType": "PlainText",
                            "content": "Name the city your cat lives in, thanks"
                        },
                        "intentName": "test",
                        "slots": {
                            "City": null
                        },
                        "slotToElicit": "City"
                    }
                };
                return callback(null, my_response.body);
            }
            var
                City = event.currentIntent.slots.City,
                AWS = require("aws-sdk"),
                DDB = new AWS.DynamoDB({
                    apiVersion: "2012-08-10",
                    region: "us-east-1"
                }),
                lookup_name_str = City.toUpperCase(),
                params = {
                    TableName: "weather",
                    KeyConditionExpression: "sc = :v1",
                    ExpressionAttributeValues: {
                        ":v1": {
                            "S": lookup_name_str
                        }
                    },
                    ProjectionExpression: "t"
                };

            console.log(params);
            DDB.query(params, function (err, data) {
                if (err) {
                    throw err;
                }

                if (data.Items && data.Items[0] && data.Items[0].t) {
                    console.log("city weather found");
                    console.log(data.Items[0]);
                    my_response.statusCode = 200;
                    my_response.body = {
                        "sessionAttributes": {
                            "temp_str": data.Items[0].t.N,
                            "City": event.currentIntent.slots.City
                        },
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                "contentType": "PlainText",
                                "content": data.Items[0].t.N
                            }
                        }
                    };
                } else {
                    console.log("city weather not found for " + lookup_name_str);
                    my_response.statusCode = 200;
                    my_response.body = {
                        "dialogAction": {
                            "type": "ElicitSlot",
                            "message": {
                                "contentType": "PlainText",
                                "content": "Please try another city, we couldn't find the weather for that city"
                            },
                            "intentName": "test",
                            "slots": {
                                "City": null
                            },
                            "slotToElicit": "City"
                        }
                    }
                }
                return callback(null, my_response.body);
            });
        });
    });
};








var http = require('http');
exports.handler = function (event, ctx, callback) {

    var 
            my_response = {};
            if (event.currentIntent.slots.City) {
                // we have the city already awesome keep going
            } else {
                //we need to ask for (elicit) a city
                my_response.statusCode = 200;
                my_response.body = {
                    "dialogAction": {
                        "type": "ElicitSlot",
                        "message": {
                            "contentType": "PlainText",
                            "content": "Name the city your cat lives in, thanks"
                        },
                        "intentName": "test",
                        "slots": {
                            "City": null
                        },
                        "slotToElicit": "City"
                    }
                };
                return callback(null, my_response.body);
            }
            var
                City = event.currentIntent.slots.City,
                AWS = require("aws-sdk"),
                DDB = new AWS.DynamoDB({
                    apiVersion: "2012-08-10",
                    region: "us-east-1"
                }),
                lookup_name_str = City.toUpperCase(),
                params = {
                    TableName: "weather",
                    KeyConditionExpression: "sc = :v1",
                    ExpressionAttributeValues: {
                        ":v1": {
                            "S": lookup_name_str
                        }
                    },
                    ProjectionExpression: "t"
                };

            console.log(params);
            DDB.query(params, function (err, data) {
                if (err) {
                    throw err;
                }

                if (data.Items && data.Items[0] && data.Items[0].t) {
                    console.log("city weather found");
                    console.log(data.Items[0]);
                    my_response.statusCode = 200;
                    my_response.body = {
                        "sessionAttributes": {
                            "temp_str": data.Items[0].t.N,
                            "City": event.currentIntent.slots.City
                        },
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                "contentType": "PlainText",
                                "content": event.currentIntent.slots.City
                            }
                        }
                    };
                    
                    console.log("city weather found");
                    console.log(data.Items[0]);
                    my_response.statusCode = 200;
                    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + event.currentIntent.slots.City + '&appid=be97ab389e6883a0097c72b91dab5ffc&units=metric';
                    var res = http.get(url, function(res){
                    var body = '';
                    
                    res.on('data', function(chunk){
                        body += chunk;  
                    });
                    res.on('end', function(){
                        var responce = JSON.parse(body);
                        console.log("Got a Weather responce: "+responce);
                        var final ={
                            "sessionAttributes": {
                            "temp_str": data.Items[0].t.N,
                            "City": event.currentIntent.slots.City
                        },
                            "dialogAction": {
                                "type":"Close",
                                "fulfillmentState":"Fulfilled",
                                "message": {
                                    "contentType":"PlainText",
                                    "content" : Math.floor(responce.main['temp'])+ " °C."
                                }
                            }
                        }
                        callback(null,final);
                    });
                    });
                } else {
                    console.log("city weather not found for " + lookup_name_str);
                    my_response.statusCode = 200;
                    my_response.body = {
                        "dialogAction": {
                            "type": "ElicitSlot",
                            "message": {
                                "contentType": "PlainText",
                                "content": "Please try another city, we couldn't find the weather for that city"
                            },
                            "intentName": "test",
                            "slots": {
                                "City": null
                            },
                            "slotToElicit": "City"
                        }
                    };
                }
                return callback(null, my_response.body);
            });
};