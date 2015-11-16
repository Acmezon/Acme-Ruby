var myApp = angular.module("ContactListApp", []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	var url;
	var checkUrl = function() {
		if($scope.req_url == undefined || $scope.req_url == "")
			url = "/contacts"
		else
			url = $scope.req_url
	}

	$scope.refresh = function() {
		checkUrl();
		$http.get(url).success(function (contacts) {
			$scope.contactlist = contacts;
		}).error(function (status, response) {
			$scope.contactlist = [{ name : "Cannot load data", email : "", number : ""}]
		});
	}

	$scope.refresh();

	$scope.addContact = function() {
		checkUrl();
		$http.post(url, $scope.contact).success(function(response){
			$scope.contact.name = null;
			$scope.contact.email = null;
			$scope.contact.number = null;
			$scope.refresh();
		});
	};

	$scope.deleteContact = function(oid, _id) {
		checkUrl();
		if(oid == undefined)
			$http.delete(url +_id).success(function (response) {
				$scope.refresh();
			});
		else
			$http.delete(url + '/contacts/'+oid).success(function (response) {
				$scope.refresh();
			});
	}
}]);