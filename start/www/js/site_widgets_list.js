(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {

			$scope.colorSort = false;

			$scope.country = {};

			$scope.widgets = [
				{ "id": 1, "name": "Small Red Widget",   "description": "A small, red widget.",   "color": "red",    "size": "small",  "quantity": 2 },
				{ "id": 2, "name": "Medium Blue Widget", "description": "A medium, blue widget.", "color": "blue",   "size": "medium", "quantity": 15 },
				{ "id": 3, "name": "Large Green Widget", "description": "A large, green widget.", "color": "green",  "size": "large",  "quantity": 30 },
				{ "id": 4, "name": "Tiny Orange Widget", "description": "A tiny, orange widget.", "color": "orange", "size": "tiny",   "quantity": 10 }
			];

			$scope.colors = [
				"orange",
				"white",
				"light blue",
				"yellow",
				"blue",
				"red",
				"green",
				"dark green",
				"bright red",
				"gold",
				"saffron",
				"brown"
			];

			$scope.countries = [
				{ name: "Saudi Arabia", capital: "Riyadh", continent: "Asia" },
				{ name: "China", capital: "Beijing", continent: "Asia" },
				{ name: "Netherlands", capital: "Amsterdam", continent: "Europe" },
				{ name: "Hungary", capital: "Budapest", continent: "Europe" },
				{ name: "Russia", capital: "Moscow", continent: "Asia" },
				{ name: "Bangladesh", capital: "Dhaka", continent: "Asia" },
				{ name: "India", capital: "New Delhi", continent: "Asia" },
				{ name: "United States", capital: "Washington, DC", continent: "North America" },
				{ name: "Columbia", capital: "Bogata", continent: "South America" },
				{ name: "Canada", capital: "Ottawa", continent: "North America" },
				{ name: "Argentina", capital: "Buenos Aires", continent: "South America" },
				{ name: "Chile", capital: "Santiago", continent: "South America" }
			];

			window.addColor = function() {

				$scope.$apply(function() {
					$scope.colors.push($scope.newColor);
					$scope.newColor = "";
					console.dir($scope.colors);
				});
			}

			$scope.addCountry = function() {
				$scope.countries.push($scope.country);
				$scope.country = {};
			};



		});

})(angular);
