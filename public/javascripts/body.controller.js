(function () {

	"use strict";
	angular.module('app')
		.controller('BodyController', function (Projects){
			
			var vm = this;
			
			vm.welcome = 'hi there';
			
			Projects.get()
			.then(function (projects){
				vm.projects = projects;
			});		
	});
}());