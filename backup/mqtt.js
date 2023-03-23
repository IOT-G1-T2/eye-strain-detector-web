var mqtt = require('mqtt');

// your credentials
const options = {
  username: 'eye-device', //subscriber
  password: 'eye00tea'
};

// connect to your cluster, insert your host name and port
const client = mqtt.connect('tls://b9077f2e76454af2ba6671215f63b057.s2.eu.hivemq.cloud:8883', options);

// prints a received message
client.on('message', function(topic, message) {
  console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('Connected!');
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// subscribe
client.subscribe('<topic here>');
// client.publish('messages', 'Hello, this message was received!');

