describe("home controller", function() {

	var mockScope;

	beforeEach(angular.mock.module("WidgetApp"));

	beforeEach(angular.mock.inject(function($controller, $rootScope) {

		mockScope = $rootScope.$new();

		$controller("HomeCtrl", {
			$scope: mockScope
		});

	}));

	it("set message", function() {

		expect(mockScope.message).toBe("Widgets Application");

	});


})
