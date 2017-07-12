app.controller('selectClinicCtrl', ['$scope', '$rootScope', 'ClinicService', 'dialog', 'cityService', '$state', 'StorageConfig', function($scope, $rootScope, ClinicService, dialog, cityService, $state, StorageConfig){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;

	$scope.selectedState=0;
	$scope.showCity=false;

	window.headerConfig={
		enableBack: true,
		title: '选择诊所',
		enableRefresh: false,
		otherRightOperate: {
			enable: false,
			html: '上海',
			clickCall: function(){
				$scope.showCity=!$scope.showCity;
			}
		}
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	showClinic('上海',spinner);

	cityService.getCity().then(function(res){
		$scope.cityList=res.results.city;
	},function(res){
		dialog.alert(res.errorMsg);
	});

	$scope.checkCity=function(_state){
		$scope.selectedState=_state;
	}

	$scope.checkClinic=function(_city){
		if($scope.selectedCity==_city.id){
			$scope.showCity=!$scope.showCity;
		}else{
			window.headerConfig.otherRightOperate.html=_city.city;
			$rootScope.$broadcast('setHeaderConfig',window.headerConfig);
			$scope.showCity=!$scope.showCity;
			var spinner2=dialog.showSpinner();
			$scope.selectedCity=_city.id;
			showClinic(_city.city,spinner2);
		}
		
	}

	function showClinic(_city,_spinner){
		var urlOptions={
			city_name: _city
		}
		ClinicService.getClinicByCity(urlOptions).then(function(res){
			dialog.closeSpinner(_spinner.id);
			$scope.clinics=res.results.clinics;
		},function(res){
			dialog.closeSpinner(_spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.bookingClinic=function(_id,_clinicInfo){
		StorageConfig.BOOKING_STORAGE.putItem('clinicInfo',_clinicInfo);
		$state.go('layout.booking-clinic',{
			id: _id,
			cityId: _clinicInfo.cityId
		});
	}
}]);