var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var mongoose = require('mongoose');
//connect to MongoDB
var mongoDBServer = "mongodb+srv://snayakk:Ccompiler7!@test-cluster-vt9ln.mongodb.net/grubhub?retryWrites=true&w=majority";

mongoose.connect(mongoDBServer, { useNewUrlParser: true , useUnifiedTopology: true });

//import handle_request from './services/buyer';
var buyer = require('./topic_handlers/buyer.js');
var seller = require('./topic_handlers/seller.js');
var order = require('./topic_handlers/order.js');
var chat = require('./topic_handlers/chat.js');


function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname(data.data, function(err,res) {
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("buyer", buyer.handleRequest)
handleTopicRequest("seller", seller.handleRequest)
handleTopicRequest("order", order.handleRequest)
handleTopicRequest("chat", chat.handleRequest)
