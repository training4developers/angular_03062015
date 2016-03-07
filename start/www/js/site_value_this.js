(function(angular) {

	"use strict";


	angular.module("WidgetApp", [])
		.controller("HomeCtrl", function($scope) {


			function doSomething() {
				console.dir(this);
			}

			doSomething();

			var o = {
				id: 2,
				doSomething: doSomething
			};

			o.doSomething();

			console.log(doSomething === o.doSomething);

			var p = {
				name: "Abdulaziz",
				doSomething: doSomething
			};

			var c = Object.create(p);
			c.name = "Khalid";

			c.doSomething();

			p.doSomething();

			console.dir(c);

			console.log(c.doSomething === p.doSomething);


			var g = {
				getFullName: function() {

				}
			}

		});

})(angular);
