app.controller('doctorListCtrl', ['$scope', '$rootScope', 'doctorService', 'dialog', '$state', function($scope, $rootScope, doctorService, dialog, $state){
	window.headerConfig = {
		enableHeader: false,
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.selectedTab = 0;

	$scope.checkTab = function(_index){
		$scope.selectedTab = _index;
	}

	var spinner = dialog.showSpinner();
	doctorService.getDoctorList().then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.doctors = res.results;
	}, function(res){
		dialog.alert(res.errorMsg);
	});

	doctorService.getDeptList().then(function(res){
		$scope.depts = res.results;
	}, function(res){
		dialog.alert(res.errorMsg);
	});

	$scope.goDutydate = function(_id){
		$state.go('layout.doctor-dutydate', {
			id: _id
		});
	}
}]);