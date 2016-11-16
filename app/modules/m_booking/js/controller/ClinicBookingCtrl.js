app.controller('ClinicBookingCtrl',['$scope','$rootScope','$stateParams','ClinicBookingService','dialog','StorageConfig','$state',function($scope,$rootScope,$stateParams,ClinicBookingService,dialog,StorageConfig,$state){
	window.headerConfig={
		enableBack: true,
		title: '提交预约',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.type=$stateParams.type;
	$scope.clinicId=$stateParams.clinicId;
	$scope.serviceId=$stateParams.serviceId;
	$scope.time=$stateParams.time;
	$scope.date=$stateParams.date;
	$scope.doctorId=$stateParams.doctorId;
	$scope.serviceName=StorageConfig.SERVICE_STORAGE.getItem('serviceName');
	$scope.timeList=[
		'08:00',
		'08:30',
		'09:00',
		'09:30',
		'10:00',
		'10:30',
		'11:00',
		'11:30',
		'14:00',
		'14:30',
		'15:00',
		'15:30',
		'16:00',
		'16:30',
		'17:00',
		'17:30',
	];

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: '15212789819',
		token: '6859CACBA01AAA721E65FD83F0AE19A2',
		clinic_id: $scope.clinicId,
		service_id: $scope.serviceId
	}
	ClinicBookingService.getDoctorByClinicIdAndServiceId(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		var doctors=res.results.doctors;
		if(doctors.length>0){
			angular.forEach(doctors,function(doctor,index,array){
				if($scope.doctorId==doctor.doctorId){
					$scope.doctor=doctor;
				}
			});
		}
		$scope.childs=res.results.childs;
	},function(res){
		dialog.alert(res.errorMsg);
	});
	// 根据预约日期展示预约时间
	$scope.switchTime=function(date){
		console.log(new Date(date));
	}
	$scope.submitForm=function(){
		var spinner2=dialog.showSpinner();
		var _paramsObj={
			username: '15212789819',
			token: '6859CACBA01AAA721E65FD83F0AE19A2',
			user_doctor_id: $scope.doctorId,
			type: $scope.type,
			clinic_id: $scope.clinicId,
			service_id: $scope.serviceId,
			child_id: $scope.selectedChild.childId,
			child_name: $scope.selectedChild.childName,
			age: String($scope.selectedChild.age),
			booking_date: '2016-11-19',
			time: $scope.time?$scope.time:$scope.clinicBooking.time,
			mobile: $scope.clinicBooking.mobile
		}
		ClinicBookingService.postClinicBooking(_paramsObj).then(function(res){
			dialog.closeSpinner(spinner2.id);
			if(res.status=='ok'){
				$state.go('layout.orderlist');
			}
		},function(res){
			dialog.closeSpinner(spinner2.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);