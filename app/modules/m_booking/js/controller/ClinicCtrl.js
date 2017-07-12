app.controller('clinicCtrl',['$scope','$rootScope','dialog','ClinicService','$state','StorageConfig','$stateParams',function($scope,$rootScope,dialog,ClinicService,$state,StorageConfig,$stateParams){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	$scope.clinic=StorageConfig.BOOKING_STORAGE.getItem('clinicInfo')?StorageConfig.BOOKING_STORAGE.getItem('clinicInfo'):requestClinic();
	
	window.headerConfig.title=$scope.clinic.clinicName;
	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	function requestClinic(){
		var spinner=dialog.showSpinner();
		var clinicId=$stateParams.id;
		var cityId=$stateParams.cityId;
		var urlOptions={
			city_id: cityId
		}
		ClinicService.getClinicByCity(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
			angular.forEach(res.results.clinics,function(clinic,index,array){
				if(clinicId==clinic.clinicId){
					$scope.clinic=clinic;
				}
			});
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goBooking=function(_type){
		$state.go('layout.booking-info');
		// StorageConfig.SERVICE_STORAGE.putItem('serviceName',$scope.serviceName);
		// $state.go('layout.booking-booking',{
		// 	type: _type,
		// 	clinicId: $scope.clinic.clinicId,
		// 	serviceId: $scope.selectId
		// });
	}
	$scope.goSelectDoctor=function(_type){
		StorageConfig.SERVICE_STORAGE.putItem('serviceName',$scope.serviceName);
		$state.go('layout.booking-selectDoctor',{
			type: _type,
			clinicId: $scope.clinic.clinicId,
			serviceId: $scope.selectId
		})
	}

	$scope.showMap=function(clinic){
		$state.go('layout.booking-map',{
			lat: clinic.latitude,
			lng: clinic.longitude
		})
	}
}]);