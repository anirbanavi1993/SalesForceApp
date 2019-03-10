angular.module('myapp').controller('Appctrl',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
	console.log("in controller");

	$http.get('/contact').then(function(response){
		console.log("Inside controller");
		$scope.contactlist=response.data;
	});

	/*$scope.about = function(){
		console.log("in baout");
		$location.path('/about');
	};*/
	var mywindow;

	$scope.about = function(){
		console.log("in submit");
		$http.get('/authred').then(function(response){
			console.log('got redirection response='+response.data);
			/*$setTimeout(function() {
				mywindow.close();
				console.log('after window close');
			}, 10);*/
			mywindow = window.open(response.data,'C-Sharpcorner', 'width=500,height=400');
			
		});
		
	};

	/*$http.get('/closeWindow').then(function(response){
		console.log("closeWindow Success 1");
		if (response.data == 'Success') {
			mywindow.close();
			console.log("closeWindow Success");
		}
	});*/

	$scope.contact = function(){
		console.log("in contact");
		$location.path('/con');
	};
	
}]);


