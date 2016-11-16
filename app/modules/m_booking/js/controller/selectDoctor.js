app.controller('selectDoctorCtrl',['$scope','$rootScope','ClinicBookingService','dialog','$stateParams','$filter','$state',function($scope,$rootScope,ClinicBookingService,dialog,$stateParams,$filter,$state){
	window.headerConfig={
		enableBack: true,
		title: '选择医生',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.type=$stateParams.type;
	$scope.clinicId=$stateParams.clinicId;
	$scope.serviceId=$stateParams.serviceId;
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
		var duty=[];
		if(doctor.doctorDutys.length>0){
			var widthScroll=(doctor.doctorDutys.length+1)*90;
			document.getElementById('ulScroll').style.width=widthScroll+'px';
			angular.forEach(doctor.doctorDutys,function(doctorDuty,index,array){
				duty.push({'dutyDate':doctorDuty.dutyDate,timeList:$filter('timeFilter')(doctorDuty.timeList,doctorDuty.selectedList)});
			});
		}
		$scope.doctorDutys=duty;
		$scope.selectedDoctor=doctor.doctorId;
		$scope.showTime=true;
	}
	$scope.selectTime=function(timeObj,_date){
		if(timeObj.optional){
			dialog.confirm('确定预约：'+_date+' '+timeObj.timeText,{
				closeCallback: function(value){
					if(value==0){
					}else{
						$state.go('layout.booking-booking',{
							date: _date,
							time: timeObj.timeText,
							type: $scope.type,
							clinicId: $scope.clinicId,
							serviceId: $scope.serviceId,
							doctorId: $scope.selectedDoctor
						})
					}
				}
			});
		}
	}
}]);