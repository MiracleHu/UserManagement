var app = angular.module('myApp', ['ui.bootstrap','ngRoute']);

app.filter('startFrom',function(){
  return function(input,start){
    start=+start;
    return input.slice(start);
  }
});


