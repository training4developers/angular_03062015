(function(angular) {

	"use strict";

	angular.module("WidgetApp", [])
		.factory("widgets", function($http) {

			return {
				getAll: function() {
					return $http.get("/api/widgets");
				}
			};

		})
		.controller("HomeCtrl", function($scope, $http) {

			$http.post("/api/widgets", {
				name: "Puppy Monkey Baby",
				description: "A hybrid animal which drinks too much Mountain Dew",
				color: "brown",
				size: "medium",
				qty: 1
			}).then(function(results) {
				return $http.get("/api/widgets");
			}).then(function(results) {
				return $http.get("/api/widgets");
			}).then(function(results) {
				$scope.widgets = results.firstWidgets;
				console.dir(results);
			}).catch(function(results) {
				console.dir(results);
			});



		});

})(angular);
