const settings = require("./settings");
const Minio = require("minio");

const minioClient = new Minio.Client({
    endPoint: settings.MINIO_ENDPOINT,
    port: Number(settings.MINIO_PORT),
    useSSL: false,
    accessKey: settings.MINIO_ACCESS_KEY,
    secretKey: settings.MINIO_SECRET_KEY,
});

async function testMinio() {
    try {
        const presignedUrl = minioClient.presignedUrl("GET", settings.MINIO_BUCKET, "test.txt");
        console.log("Test URL:", presignedUrl);
    } catch (error) {
        console.error("MinIO connection error:", error);
    }
}

testMinio();


module.exports = minioClient;
