var mqtt = require('mqtt')

var options = {
    host: 'b9077f2e76454af2ba6671215f63b057.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'eye-device',
    password: 'iot-eyes'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Bro');