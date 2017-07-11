app.controller('doctorDutydateCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	window.headerConfig = {
		enableHeader: false,
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
}]);