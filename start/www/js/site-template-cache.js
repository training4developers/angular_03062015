(function(angular) {

	"use strict";


	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {
			$scope.message = "WYDOT";
			$scope.tpl = "/tpls/home.tpl";
		})
		.run(function($templateCache) {

			$templateCache.put("/tpls/home.tpl", "<h1>{{message}}</h1>");

			setTimeout(function() {
				// console.log($templateCache.get("/tpls/home.tpl").then(function() {
				// 	console.log(arguments);
				// }));
			},0);

		});

})(angular);
