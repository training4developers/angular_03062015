(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.controller("ParentCtrl", function($scope) {

			$scope.o = {};

			$scope.showScope = function() {
				console.dir($scope);
			}


		})
		.controller("ChildCtrl", function($scope) {


		});

})(angular);
