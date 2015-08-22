app.factory("AuthenticationService", function($location) {
  return {
    login: function(credentials) {
      if (credentials.username !== "hhu" || credentials.password !== "hhu") {
        alert("Username must be 'hhu', password must be 'hhu'");
      } else {
        $location.path('/home');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
});