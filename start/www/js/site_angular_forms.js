(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {

			$scope.submitContact = function() {

				if ($scope.contactForm.$invalid) {
					alert("Form is invalid!")
					return;
				}

				console.dir($scope.contact);
			};

			$scope.countries = [
				{ code: "SA", name: "Saudi Arabia", capital: "Riyadh", continent: "Asia" },
				{ code: "CN", name: "China", capital: "Beijing", continent: "Asia" },
				{ code: "NL", name: "Netherlands", capital: "Amsterdam", continent: "Europe" },
				{ code: "HU", name: "Hungary", capital: "Budapest", continent: "Europe" },
				{ code: "RU", name: "Russia", capital: "Moscow", continent: "Asia" },
				{ code: "BD", name: "Bangladesh", capital: "Dhaka", continent: "Asia" },
				{ code: "IN", name: "India", capital: "New Delhi", continent: "Asia" },
				{ code: "US", name: "United States", capital: "Washington, DC", continent: "North America" },
				{ code: "CO", name: "Columbia", capital: "Bogata", continent: "South America" },
				{ code: "CA", name: "Canada", capital: "Ottawa", continent: "North America" },
				{ code: "AR", name: "Argentina", capital: "Buenos Aires", continent: "South America" },
				{ code: "CL", name: "Chile", capital: "Santiago", continent: "South America" }
			];

		});

})(angular);
