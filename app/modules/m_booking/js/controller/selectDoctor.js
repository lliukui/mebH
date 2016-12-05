app.controller('selectDoctorCtrl',['$scope','$rootScope','ClinicBookingService','dialog','$stateParams','$filter','$state','StorageConfig',function($scope,$rootScope,ClinicBookingService,dialog,$stateParams,$filter,$state,StorageConfig){
	window.headerConfig={
		enableBack: true,
		title: '选择医生',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.type=$stateParams.type;
	$scope.clinicId=$stateParams.clinicId;
	$scope.serviceId=$stateParams.serviceId;

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		clinic_id: $scope.clinicId,
		service_id: $scope.serviceId
	}
	ClinicBookingService.getDoctorByClinicIdAndServiceId(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.doctors=res.results.doctors;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	var dateNavScroll = new IScroll('#dateNavScroll', {
        scrollX: true,
        scrollY: false,
        mouseWheel: false,
        click: true
    });
    setInterval(function(){
        dateNavScroll.refresh();
    },1000);

	//初始显示所有医生、不显示时间选择
	$scope.showTime=false;
	$scope.selectedDoctor=false;
	$scope.reselection=function(){
		$scope.selectedDoctor=false;
		$scope.showTime=false;
	}
	$scope.checkDoctor=function(doctor){
		$scope.selectedDate=0;
		var duty=[];
		if(doctor.doctorDutys.length>0){
			var widthScroll=(doctor.doctorDutys.length+1)*110;
			document.getElementById('ulScroll').style.width=widthScroll+'px';
			angular.forEach(doctor.doctorDutys,function(doctorDuty,index,array){
				duty.push({'dutyDate':doctorDuty.dutyDate,timeList:$filter('timeFilter')(doctorDuty.timeList,doctorDuty.selectedList)});
			});
		}
		$scope.doctorDutys=duty;
		$scope.selectedDoctor=doctor.doctorId;
		$scope.showTime=true;
	}
	$scope.selectedDate=0;
	$scope.checkDate=function(doctorDuty){
		$scope.selectedDate=doctorDuty.dutyDate;
	}
	$scope.selectTime=function(timeObj,_date){
		if(timeObj.optional){
			dialog.confirm('确定预约：'+_date+' '+timeObj.timeText,{
				closeCallback: function(value){
					if(value==0){
					}else{
						//预约占座
						var spinner2=dialog.showSpinner();
						var params={
							username: StorageConfig.TOKEN_STORAGE.getItem('username'),
							token: StorageConfig.TOKEN_STORAGE.getItem('token'),
							doctor_id: $scope.selectedDoctor,
							duty_date: _date,
							time: timeObj.timeText
						}
						ClinicBookingService.bookingtime(params).then(function(res){
							dialog.closeSpinner(spinner2.id);
							$state.go('layout.booking-booking',{
								date: _date,
								time: timeObj.timeText,
								type: $scope.type,
								clinicId: $scope.clinicId,
								serviceId: $scope.serviceId,
								doctorId: $scope.selectedDoctor
							})
						},function(res){
							dialog.closeSpinner(spinner2.id);
							dialog.alert(res.errorMsg);
						});
					}
				}
			});
		}
	}
}]);