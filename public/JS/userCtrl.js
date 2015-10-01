app.controller('userCtrl', function($scope,$log,AuthenticationService,UserService,$location,Notification){

  $scope.users=[]; // declare the users in the $scope for an empty array, this is important
  $scope.userInfo = UserService.userInfo;
  
  //define a non $scope function for controller inner use
  function initUsers (){
    UserService.getAllUsers()
      .success(function(data){
        $scope.users = data;
      })
      .error(function(data) {
        console.log('Error '+data);
      });
  }

  initUsers(); // get all users when page load

  // Pagination parts only based on users array.  can be write in the controller
  $scope.maxTab = 4;
  $scope.totalItems = $scope.users.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 7;
  $scope.$watch('filtered.length', function(){
    if ($scope.filtered!==undefined) {
      $scope.totalItems = $scope.filtered.length;}else{
        $scope.totalItems = $scope.users.length;}
      });

  // end of the Pagination

  $scope.editUser = function(argu) {
    if (argu == 'new') {
      $scope.userInfo.edit = true;
      $scope.userInfo.incomplete = true;
      $scope.userInfo.fName = '';
      $scope.userInfo.lName = '';
      $scope.userInfo.sex = '';
      $scope.userInfo.age = '';
      $scope.userInfo.passw1 = '';
      $scope.userInfo.passw2 = '';
    } else {
      $scope.userInfo.edit = false;
      $scope.userInfo.uID = argu._id;// All the variables in userInfo has been set and will be passed in update 
      $scope.userInfo.fName = argu.fName;
      $scope.userInfo.lName = argu.lName;
      $scope.userInfo.sex = argu.sex;
      $scope.userInfo.age = argu.age;
      $scope.userInfo.passw1 = argu.passw1;
      $scope.userInfo.passw2 = argu.passw2;
    }
    $location.path('/create');
  };

  $scope.$watch('userInfo.passw1',function() {$scope.test();});
  $scope.$watch('userInfo.passw2',function() {$scope.test();});
  $scope.$watch('userInfo.fName', function() {$scope.test();});
  $scope.$watch('userInfo.lName', function() {$scope.test();});
  $scope.$watch('userInfo.sex', function() {$scope.test();});
  $scope.$watch('userInfo.age', function() {$scope.test();});

  $scope.test = function() {
    if ($scope.userInfo.passw1 !== $scope.userInfo.passw2) {
      $scope.userInfo.error = true;
    } else {
      $scope.userInfo.error = false;
    }
    $scope.userInfo.incomplete = false;
    if ($scope.userInfo.edit && (!$scope.userInfo.fName.length ||
      !$scope.userInfo.lName.length ||
      !$scope.userInfo.passw1.length || !$scope.userInfo.passw2.length|| !$scope.userInfo.sex.length|| !$scope.userInfo.age.length)) {
     $scope.userInfo.incomplete = true;
    }
  };

  $scope.createNew=function(userInfo){
    UserService.createNew(userInfo)
      .success(function(data){
        $scope.users = data;
        Notification.success('New User Created');
      })
      .error(function(data) {
        console.log('Error '+data);
      });
  };

  $scope.removeUser = function(id) {
    UserService.deleteUser(id)
      .success(function(data){
        $scope.users = data;
      })
      .error(function(data) {
        console.log('Error '+data);
      });
  };

  $scope.updateInfo=function(userInfo){
    UserService.updateUser(userInfo)
    .success(function(data){
      $scope.users = data;
      Notification.success('Update Success');
    })
    .error(function(data) {
      console.log('Error '+data);
    });
  };

  $scope.toggleEdit=function(){
    $scope.userInfo.showorhide=!$scope.userInfo.showorhide;
  };


  $scope.logout = function() {
    AuthenticationService.logout();
  };
  
  $scope.backtohome=function(){
    $location.path('/home');
  };

});