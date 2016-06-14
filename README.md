### Trails.js - AWS Lambda example app

This is a simple application that demonstrates offloading long-running cpu-bound tasks to the AWS Lambda service.  Running this example requires an AWS account with Lambda permissions.  

The long-running cpu-bound task in this prototype is a slow hashing function. The general flow goes like this:

* A user posts a request to the app, with the string they want hashed.
* The app responds immediately to the request, confirming that it received the input with a 200 response.
* The app forwards the request to an AWS Lambda function, which does the actual work.
* Once the lambda function finishes, it notifies the app that the job is done, and the app logs the generated hash.
* If this was a production use case, the app would notify the user of the finished hash via socket.io or store the result in a database.

AWS Lambda and node.js are a powerful combination for cpu-bound tasks.  Node.js has nonblocking io, and AWS Lambda scales effeciently, affording flexibility and very high throughput with a simple architecture.

### Steps required to run this example

* Set up the lambda function.  The javascript code for the lambda function is zipped up in the root of this project, as `trailsLambdaFn.zip`
* You can set up the lambda function via the aws cli or the aws console, see the related aws tutorials for more details on that part
* This code defaults the aws region to 'us-east-1', but it can be overriden via the env var `AWS_REGION`
* My lambda configuration is as follows:
```
    runtime: Node.js 4.3
    handler: index.handler
    role: lambda_basic_execution
    memory: 128MB
    timeout: 1 min 0 sec
    VPC: no vpc
```
* This project uses the node aws sdk, which assumes your aws key id and secret access key are in the default location ~/.aws/credentials
* Once your lambda function is ready, run npm install in the root of the project, and then start the server via `node server.js`
* To test the hashing function, you can use curl to POST to your webserver: `curl -X POST -d '{"input":"some string to hash"}' localhost:3000/api/v1/hash`
* The server will immediately respond with an empty `200` response, but if you monitor the server logs, you will see the results of the lambda function after a short time (~20 seconds for me)
