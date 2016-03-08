(function(angular) {

	"use strict";

	angular.module("WidgetApp", ["ui.router"])
		.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

			$urlRouterProvider.otherwise("/");
			$locationProvider.html5Mode(false);

			$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "/tpls/list.tpl",
					controller: "home"
					// template: "<h2>{{title}}</h2><a ui-sref='about'>About</a><ul><li ng-repeat='widget in widgets'>{{widget.name}}</li></ul>",
					// controller: function($scope, widgets) {
					// 	$scope.title = "Home";
					//
					// 	widgets.getAll().then(function(results) {
					// 		$scope.widgets = results.data;
					// 	})
					// }
				})
				.state("about", {
					url: "/about",
					template: "<h2>{{title}}</h2>",
					controller: function($scope) {
						$scope.title = "About";
					}
				});


		})
		.factory("widgets", ["$http", function($http) {

			return {
				getAll: function() {
					return $http.get("/api/widgets");
				},
				get: function(widgetId) {
					return $http.get("/api/widgets/" + encodeURIComponent(widgetId));
				},
				insert: function(widget) {
					return $http.post("/api/widgets", widget);
				},
				update: function(widget) {
					return $http.put("/api/widgets/" + encodeURIComponent(widget.id), widget);
				},
				delete: function(widgetId) {
					return $http.delete("/api/widgets/" + encodeURIComponent(widgetId));
				}
			};

		}]);

})(angular);
