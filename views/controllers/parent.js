'use strict';

var myapp = angular.module('myapp',['ngRoute']);

myapp.config(function($routeProvider){
	console.log("in routing");
	$routeProvider.when('/',{
		templateUrl: '/layoutindex.html',
		controller: 'Appctrl'
	}).when('/about',{
		templateUrl: '/about.html',
		controller: 'aboutctrl'
	}).when('/con',{
		templateUrl: '/contact.html',
		controller: 'contactctrl'
	});
}); 