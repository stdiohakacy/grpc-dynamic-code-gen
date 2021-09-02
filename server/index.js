const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const userProtoPath = path.join(__dirname, "..", "protos", "user.proto");

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const userPackageDefinition = grpc.loadPackageDefinition(userProtoDefinition).user;

function postUser(input, callback) {
    const { first_name, last_name, password } = input.request.user;
    callback(null, { first_name, last_name });
}

function main() {
    const server = new grpc.Server();
    server.addService(userPackageDefinition.UserService.service, {
        postUser
    })
    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
    server.start();
    console.log(`Server is running`);
}

main();