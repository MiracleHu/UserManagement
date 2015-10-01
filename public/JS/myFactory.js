app.factory("AuthenticationService", function($location,Notification) {
  return {
    login: function(credentials) {
      if (credentials.username !== "hhu" || credentials.password !== "hhu") {
        // alert("Username must be 'hhu', password must be 'hhu'");
        Notification.error('Password or Username invalid');
      } else {
        $location.path('/home');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
});