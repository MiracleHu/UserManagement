var app = angular.module('myApp', ['ui.bootstrap','ngRoute','ui-notification']);

app.filter('startFrom',function(){
  return function(input,start){
    start=+start;
    return input.slice(start);
  };
});


