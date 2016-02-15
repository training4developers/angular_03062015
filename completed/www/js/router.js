(function(angular) {

	"use strict";

	router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

	function router($stateProvider, $urlRouterProvider, $locationProvider) {

		$stateProvider
			.state("home", {
				url: "",
				controller: "homeCtrl",
				templateUrl: "tpls/home.html"
			})
			.state("view", {
				url: "widgets/:widgetId",
				controller: "widgetViewCtrl",
				templateUrl: "tpls/widget-view.html"
			})
			.state("edit", {
				url: "widgets/:widgetId/edit",
				controller: "widgetEditCtrl",
				templateUrl: "tpls/widget-edit.html"
			})
			.state("create", {
				url: "widgets/create",
				controller: "widgetEditCtrl",
				templateUrl: "tpls/widget-edit.html"
			});
	}

	angular.module("WidgetApp").config(router)

})(angular);
