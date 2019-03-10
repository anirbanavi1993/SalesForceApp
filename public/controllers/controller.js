var myapp = angular.module('myapp',[]);
myapp.controller('Appctrl',['$scope','$http',function($scope,$http){
	console.log("Hello world from controller");
	$http.get('/contact').then(function(response){
		$scope.contactlist=response.data;
	});
	
}]);