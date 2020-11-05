# React

## What is react

React itself is just a library for building user interfaces.

## Core Principle

### Composition 

You’re probably familiar with the idea of taking individual functions and composing them together to get some value.


### Unidirectional Dataflow

A big part of building predictable and robust applications is knowing when and how state changes. If you’re coming from a jQuery background, you may be familiar with the following scenario. You start building your app, and everything is fine. You have event handlers which are responsible for updating the state of your application (which lives in the DOM, primarily).

Then your application starts to grow. Slowly each event handler gets tasked with updating more and more pieces of state. What once was nice and predictable begins to look more like this.

![img](~@pic/img/react-1.png)

As you can imagine, **relying on shared mutable state is typically a bad idea**. React takes a different approach. Instead of the source of truth for the state of your application living in the DOM, it lives inside of your React components. From there, you can explicitly decide how and when the state should change as well as what the UI looks like based off of that state.

![img](~@pic/img/react-2.png)