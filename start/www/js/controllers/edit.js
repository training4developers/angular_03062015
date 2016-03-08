(function(angular) {

	controller.$inject = ["$scope", "widgets", "$stateParams", "$state"];

	function controller($scope, widgets, $stateParams, $state) {

		if ($stateParams.widgetId) {
			widgets.get(parseInt($stateParams.widgetId, 10)).then(function(results) {
				$scope.widget = results.data;
			});
		} else {
			$scope.widget = {};
		}

		$scope.returnToList = function() {
			$state.go("home");
		};

		$scope.saveWidget = function() {

			// ($stateParams.widgetId ?
			// 	widgets.update($scope.widget) :
			// 	widgets.insert($scope.widget)).then(function() {
			// 		$state.go("home");
			// 	})

			if ($stateParams.widgetId) {
				widgets.update($scope.widget).then(function() {
					$state.go("home");
				});
			} else {
				widgets.insert($scope.widget).then(function() {
					$state.go("home");
				});
			}

		};

		$scope.deleteWidget = function() {

			if (confirm("Are you really really really sure, you want to delete the widget?")) {
				widgets.delete($stateParams.widgetId).then(function() {
					$state.go("home");
				});
			}


		};

	}

	angular.module("WidgetApp.Controllers")
		.controller("edit", controller);

})(angular);
