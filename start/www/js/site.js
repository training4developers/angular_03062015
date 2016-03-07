(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {

			$scope.widgets = [
				{ "id": 1, "name": "Small Red Widget",   "description": "A small, red widget.",   "color": "red",    "size": "small",  "quantity": 2 },
				{ "id": 2, "name": "Medium Blue Widget", "description": "A medium, blue widget.", "color": "blue",   "size": "medium", "quantity": 15 },
				{ "id": 3, "name": "Large Green Widget", "description": "A large, green widget.", "color": "green",  "size": "large",  "quantity": 30 },
				{ "id": 4, "name": "Tiny Orange Widget", "description": "A tiny, orange widget.", "color": "orange", "size": "tiny",   "quantity": 10 }
			];

			$scope.createWidget = function() {
				$scope.showEdit = true;
			};

			$scope.saveWidget = function() {
				$scope.widgets.push(this.widget);
				this.widget = {};
				$scope.showEdit = false;
			};

		});

})(angular);
