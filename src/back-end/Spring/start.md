# Intro

## How to create spring project

`start.spring.io` download a spring intialize and import into intellij

```java
package geektime.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelloWorldApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloWorldApplication.class, args);
	}

	@RequestMapping("/hello")
	public String hello() {
		return "Hello World!";
	}
}
```

Then in the terminal run `curl` `http://localhost:8080/hello` will return hello world. if you run `curl` `http://localhost:8080/actuator/health` will return server status

Then you can package it by using `mvn clean package -Dmaven.test.skip` package is in the `target` folder

And then you can run it by type `java -jar hello-spring-0.0.1-SNAPSHOT.jar`


