function startConnect(){

    host = 'b9077f2e76454af2ba6671215f63b057.s2.eu.hivemq.cloud';   
    port = 8884;  
    userId  = 'iot-eye-sub';  
    password = 'eye-oh-tea';  


    client = new Paho.MQTT.Client(host,Number(port),clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
       userName: userId,
       password: password
    });


}


function onConnect(){

    // document.getElementById("messages").innerHTML += "<span> Subscribing to topic "+topic + "</span><br>";
    console.log("connection success");
    client.subscribe(topic);
}



function onConnectionLost(responseObject){
    console.log("connection lost");
    // document.getElementById("messages").innerHTML += "<span> ERROR: Connection is lost.</span><br>";
    // if(responseObject !=0){
    //     document.getElementById("messages").innerHTML += "<span> ERROR:"+ responseObject.errorMessage +"</span><br>";
    // }
}

function onMessageArrived(message){
    console.log("OnMessageArrived: "+message.payloadString);
}

function startDisconnect(){
    client.disconnect();
    console.log("disconnection");
}

// function publishMessage(){
// msg = document.getElementById("Message").value;
// topic = document.getElementById("topic_p").value;

// Message = new Paho.MQTT.Message(msg);
// Message.destinationName = topic;

// client.send(Message);
// document.getElementById("messages").innerHTML += "<span> Message to topic "+topic+" is sent </span><br>";


// }
