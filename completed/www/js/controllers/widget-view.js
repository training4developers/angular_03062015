(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets", "$state"];

	function controller($scope, widgets, $state) {

		widgets.get($state.params.id).then(function(results) {
			$scope.widget = results.data;
		});

		$scope.editWidget(widgetId) {
			$state.go("edit", { widgetId: widgetId });
		};

		$scope.returnToList() {
			$state.go("home");
		};
	}

	angular.module("WidgetApp.Controllers")
		.controller("widgetViewCtrl", controller);

})(angular);
