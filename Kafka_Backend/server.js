var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var mongoose = require('mongoose');
//connect to MongoDB
mongoose.connect('mongodb://localhost/grubhubMongo', { useNewUrlParser: true , useUnifiedTopology: true });

//import handle_request from './services/buyer';
var handle_request = require('./services/buyer.js');
console.log('sdkgkhsdg', handle_request);

function handleTopicRequest(topic_name, fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname(data.data, function(err,res){
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
handleTopicRequest("profile_buyer", handle_request)
