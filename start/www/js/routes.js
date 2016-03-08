(function(angular) {

	"use strict";

	angular.module("WidgetApp.Services")
		.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

			$urlRouterProvider.otherwise("/");
			$locationProvider.html5Mode(false);

			$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "/tpls/list.tpl",
					controller: "home"
				})
				.state("create", {
					url: "/widget/create",
					templateUrl: "/tpls/edit.tpl",
					controller: "edit"
				})
				.state("view", {
					url: "/widget/:widgetId",
					templateUrl: "/tpls/view.tpl",
					controller: "view"
				})
				.state("edit", {
					url: "/widget/:widgetId/edit",
					templateUrl: "/tpls/edit.tpl",
					controller: "edit"
				});
		});

})(angular);
