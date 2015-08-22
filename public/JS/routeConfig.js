app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'Templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'Templates/home.html',
    controller: 'userCtrl'
  });

  $routeProvider.when('/create', {
    templateUrl: 'Templates/create.html',
    controller: 'userCtrl'
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});