(function(angular) {

	angular.module("WidgetApp.Services", []);
	angular.module("WidgetApp.Controllers", ["WidgetApp.Services"]);

	angular.module("WidgetApp", ["ui.router", "WidgetApp.Controllers"]);


})(angular);
