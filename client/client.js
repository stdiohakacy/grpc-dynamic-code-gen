const path = require('path');
const protoLoader = require('@grpc/proto-loader')
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
const client = new userPackageDefinition.UserService(
    "localhost:50051",
    grpc.credentials.createInsecure()
)

function post() {
    const request = {
        user: {
            first_name: "Nguyen",
            last_name: "Duy",
            password: "12345678"
        }
    }
    client.postUser(request, (error, response) => {
        if(!error) {
            console.log(response);
        } else {
            console.log(error);
        }
    })
}

function main() {
    post();
}

main()