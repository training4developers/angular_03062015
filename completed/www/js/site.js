(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {
			$scope.message = "Widgets Application";
		});

})(angular);
