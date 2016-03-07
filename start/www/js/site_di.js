(function(angular) {

	"use strict";

	homeCtrl.$inject = ["$log", "$scope"];

	function homeCtrl($log, $scope) {
		$scope.message = "Hi Class!";
		$log.log($scope.message);


	}

	angular.module("WidgetApp", [])
		.controller("HomeCtrl", homeCtrl);

	console.log(homeCtrl.toString());

})(angular);
