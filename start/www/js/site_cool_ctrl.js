(function(angular) {

	"use strict";


	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {

			$scope.message = "The Queen Rocks!";

		})
		.controller("CoolCtrl", function($scope) {

			console.log("cool ctrl ran");

		});
})(angular);
