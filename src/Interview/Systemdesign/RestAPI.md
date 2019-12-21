# RestAPI

## Are RestAPI multi-thread?

REST APIs are naturally multi-thread, once they can execute multiple requests at the same time. Therefore, every time you put a thread to wait for something synchronously you are wasting CPU time because that thread could be being used to handle another request.
Many developers utilize asynchronous methods without really understanding what it does under the hood. Basically, every action that doesn’t run on the CPU could be performed asynchronously. What does run code besides CPU on a computer? Drivers: from disk read/write operations to keyboard inputs.
When you send a web request through the internet it requires CPU (because TCP utilizes CPU), but the biggest part of the process is done by your network card driver. Therefore, this could be accomplished asynchronously. When running an asynchronous code, the operating system knows that that thread is waiting for something and then it could use this thread to run some code that needs to run on the CPU, avoiding the creation of a new thread, thus avoiding wasting memory and time.
This is how utilizing asynchronous methods may help to improve scaling your API.

## Springboot how many users can call login api at the same time

Spring Boot uses the server.tomcat.max-threads property to control the size of the client request thread pool. Its default value is zero which leaves Tomcat to use its default of 200.