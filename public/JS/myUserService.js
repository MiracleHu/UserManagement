app.service('UserService',function($http){

	var urlBase = '/api/users'; //local varabile in service, can't be access by UserService.urlBase

	this.getAllUsers = function (){
		return $http.get(urlBase);
	};

	this.createNew = function (user){
		return $http.post(urlBase,user);
	};

	// this.getOneUser = function(id){
	// 	return $http.get(urlBase+'/'+id);
	// };

	this.deleteUser = function(id){
		return $http.delete(urlBase+'/'+id);
	};

	this.updateUser = function(user){
		return $http.put(urlBase+'/'+user.uID,user);
	};

	//Note that JS edit Array & Object by reference
	// if you don't want to use var users = ..., you can use this.usrs=... which make service more like an object and no need for return

	this.userInfo={
		uID         : '',
		fName       : '',
		lName       : '',
		sex         : 'Male',
		age         : '',
		passw1      : '',
		passw2      : '',
		edit        : true,
		error       : false,
		incomplete  : false,
		showorhide  : true
	};

	// var userservice={
	// 	users:users,
	// 	userInfo:userInfo};

	// return userservice;

	});


