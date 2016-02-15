(function(angular) {

	"use strict";

	controller.$inject = ["$scope", "widgets"];

	function controller($scope, widgets) {

		widgets.get($state.params.id).then(function(results) {
			$scope.widget = results.data;
		});

		$scope.saveWidget(widget) {
			($state.params.id ? widgets.update(widget) : widgets.insert(widget)).then(function() {
				$state.go("home");
			});
		};

		$scope.deleteWidget(widgetId) {
			if (confirm("Are you sure you want to delete the widget?")) {
				widgets.delete(widgetId).then(function() {
					$state.go("home");
				});
			}
		};

		$scope.returnToList() {
			$state.go("home");
		};
	}

	angular.module("WidgetApp.Controllers")
		.controller("widgetEditCtrl", controller);

})(angular);
