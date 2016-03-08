(function(angular) {

	"use strict";

	factory.$inject = ["$http"];

	function factory($http) {

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

	}

	angular.module("WidgetApp.Services")
		.factory("widgets", factory);

})(angular);
