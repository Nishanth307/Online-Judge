const kafka = require("../../config/kafka");
const consumer = kafka.consumer({
    groupId: "judge-consumer",
});

const connectConsumer = async()=>{
    await consumer.connect();

    await consumer.subscribe({
        topic: "submission-jobs",
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({topic,partition,message})=>{
            const payload = JSON.parse(
                message.value.toString()
            );

            const { submissionId } = payload;

            console.log(`Processing submission :${submissionId}`);
        }
    });
}

module.exports = {
    connectConsumer
}