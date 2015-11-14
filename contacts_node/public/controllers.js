var myApp = angular.module("ContactListApp", []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

	var refresh = function() {
		$http.get('/contacts').success(function (contacts) {
			$scope.contactlist = contacts;
		});
	}

	refresh();

	$scope.addContact = function() {
		$http.post('/contacts', $scope.contact);
		refresh();
	};

	$scope.deleteContact = function(_id) {
		$http.delete('/contacts/'+_id);
		refresh();
	}
}]);