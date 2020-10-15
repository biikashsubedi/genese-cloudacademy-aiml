var http = require('http');

exports.handler = (event, context, callback) =>{
	var url = 'http://services.groupkt.com/state/get/IND'+ event.currentIntent.slots.CountryCode;

	var res= http.get{url, function(res){
	var body='';

	res.on('data'.function(chunk){
		body += chunk;
	});
	res.on('and', function(){
		var Response = JSON.parse(body);
		console.log("Got a Response: ", Response);
		callback(null, {
			"dialogueAction":{
			"type":"Close",
			"fillfillmentState":"Fulfilled",
			"message":{
			"contentType":"PlainText",
			"content":"The area is "+ Response.RestResponse.result.name
			}

			}
			})
		})

	}}
}

import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def lambda_handler(event, context):
    
    logger.debug(event)

    return{
    "sessionAttributes": event["sessionAttributes"],
    "dialogAction":{
      "type":"Close",
      "fulfillmentState":"Fulfilled",
      "message":{
        "contentType":"PlainText",
        "content":"success"
      }
    }
  }
