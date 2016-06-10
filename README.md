### Trails.js - AWS Lambda example app

This is a simple application that demonstrates offloading long-running cpu-bound tasks to the AWS Lambda service.  Running this example requires an AWS account with Lambda permissions.  

The long-running cpu-bound task in this prototype is a slow hashing function. The general flow goes like this:

* A user posts a request to the app, with the string they want hashed.
* The app responds immediately to the request, confirming that it received the input with a 200 response.
* The app forwards the request to an AWS Lambda function, which does the actual work.
* Once the lambda function finishes, it notifies the app that the job is done, and the app logs the generated hash.
* If this was a production use case, the app would notify the user of the finished hash via socket.io or store the result in a database.

AWS Lambda and node.js are a powerful combination for cpu-bound tasks.  Node.js has nonblocking io, and AWS Lambda scales effeciently, affording flexibility and very high throughput with a simple architecture.
