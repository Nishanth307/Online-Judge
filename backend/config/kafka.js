const kafkaafka = require("kafkajs");

const kafka = new Kafka({
    clientId: "online-judge",
    brokers: ["localhost:9092"],
})

module.exports = kafka;