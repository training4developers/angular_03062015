(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets", "$state"];

	function controller($scope, widgets, $state) {

		widgets.getAll().then(function(results) {
			$scope.widgets = results.data;
		});

		$scope.createWidget = function() {
			$state.go("create");
		};
	}

	angular.module("WidgetApp.Controllers")
		.controller("home", controller);

})(angular);
