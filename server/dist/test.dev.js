"use strict";

// setTimeout executes the provided function once after a specified delay (in milliseconds)
setTimeout(function () {
  console.log('This will be executed after 2000 milliseconds (2 seconds)');
}, 2000); // setInterval executes the provided function repeatedly at a specified interval (in milliseconds)

var intervalId = setInterval(function () {
  console.log('This will be executed every 1000 milliseconds (1 second)');
}, 1000); // After 5000 milliseconds (5 seconds), clearInterval is called to stop the interval

setTimeout(function () {
  clearInterval(intervalId);
  console.log('Interval stopped after 5000 milliseconds (5 seconds)');
}, 5000);