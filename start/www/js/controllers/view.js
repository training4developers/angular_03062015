(function(angular) {

	controller.$inject = ["$scope", "widgets", "$stateParams", "$state"];

	function controller($scope, widgets, $stateParams, $state) {

		widgets.get(parseInt($stateParams.widgetId, 10)).then(function(results) {
			$scope.widget = results.data;
		});

		$scope.returnToList = function() {
			$state.go("home");
		};

		$scope.editWidget = function() {
			$state.go("edit", { widgetId: $stateParams.widgetId });
		}

	}

	angular.module("WidgetApp.Controllers")
		.controller("view", controller);

})(angular);
