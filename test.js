function startConnect(){
    host = 'b9077f2e76454af2ba6671215f63b057.s2.eu.hivemq.cloud';   
    port = 8884;  
    userId  = 'iot-eye-sub';  
    password = 'eye-oh-tea';  

    client = new Paho.MQTT.Client(host,port);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
       userName: userId,
       password: password
    });
    


}


function onConnect(){
    topic =  document.getElementById("topic_s").value;

    document.getElementById("messages").innerHTML += "<span> Subscribing to topic "+topic + "</span><br>";

    client.subscribe(topic);
}



function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> ERROR: Connection is lost.</span><br>";
    if(responseObject !=0){
        document.getElementById("messages").innerHTML += "<span> ERROR:"+ responseObject.errorMessage +"</span><br>";
    }
}

function onMessageArrived(message){
    console.log("OnMessageArrived: "+message.payloadString);
    document.getElementById("messages").innerHTML += "<span> Topic:"+message.destinationName+"| Message : "+message.payloadString + "</span><br>";
}

function startDisconnect(){
    client.disconnect();
    document.getElementById("messages").innerHTML += "<span> Disconnected. </span><br>";




}

function publishMessage(){
msg = document.getElementById("Message").value;
topic = document.getElementById("topic_p").value;

Message = new Paho.MQTT.Message(msg);
Message.destinationName = topic;

client.send(Message);
document.getElementById("messages").innerHTML += "<span> Message to topic "+topic+" is sent </span><br>";


}


// =============================================================================

const mqtt = require('mqtt')

// CHANGE CREDENTIALS HERE AS NEEDED
const options = {
    clean:true,
    connectTimeout:5000,
    host: 'b9077f2e76454af2ba6671215f63b057.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'iot-eye-pubsub',
    password: 'eye-oh-tea'
}

const topic = 'eye-strain-detector';

// CONNECT
const client  = mqtt.connect(options)

client.on('connect', function () {

  console.log('---------------- Connected!')

  // SUBSCRIBE TO TOPIC: EDIT ACCORDINGLY
  client.subscribe(topic, function (err) {

    // IF ERROR, SWITCH TO PUBLISHER
    if (!err) {
      client.publish(topic, 'Published Message.')
      console.log('---------------- Published to topic: ' + topic)
    }
    // ELSE, SUBSCRIBE AS NORMAL
    else {
        console.log('---------------- Subscribed to topic: ' + topic)
    }
  })
})

// ON RECEIVING MESSAGE
client.on('message', function (topic, message) {
  console.log('---------------- Received Message:', topic, message.toString());
//   client.end() //send once
})

==

// ON ERROR
client.on('error', function (error) {
    console.log(error);
});

// SUBSCRIBE TO TOPIC
client.subscribe(topic);

// publish message 'Hello' to topic 'my/test/topic'
// client.publish(topic, 'Hello');

