app.controller('ClinicBookingCtrl',['$scope','$rootScope','$stateParams','ClinicBookingService','dialog','StorageConfig','$state','CommonService',function($scope,$rootScope,$stateParams,ClinicBookingService,dialog,StorageConfig,$state,CommonService){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableBack: true,
		title: '提交预约',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	window.calendarConfig={
		start_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
		end_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+30),
		selectedCallback: function(backDate){
			if(backDate){
				$scope.date=backDate.date;
				$scope.dateSelected=true;
			}
		}
	}

	$rootScope.$broadcast('setCalendarConfig', window.calendarConfig);

	$scope.type=$stateParams.type;
	$scope.dateSelected=false;
	if($scope.type=='ZJ'){
		$scope.dateSelected=true;
	}
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
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
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
		if(res.results.childs.length==1){
			$scope.selectedChild=res.results.childs[0];
		}
	},function(res){
		dialog.alert(res.errorMsg);
	});
	// 根据预约日期展示预约时间
	$scope.switchTime=function(date){
		console.log(new Date(date));
	}

	$scope.replaceMobile=function(){
		if(String($scope.mobile).length==11){
			if($scope.mobile!=StorageConfig.TOKEN_STORAGE.getItem('username')){
				$scope.showSms=true;
			}
		}else{
			$scope.showSms=false;
		}
	}

	$scope.mobile=StorageConfig.TOKEN_STORAGE.getItem('username');
	$scope.sendSMSText='验证码';
	$scope.showSms=false;
	//发送验证码
	$scope.smsverifycode=function(){
		$scope.lockEnabled=true;
		var smsParams={
			mobile: $scope.mobile,
			action_type: 200
		};
		CommonService.sendSMSCode(smsParams).then(function(res){
			dialog.alert('验证码已发送');
			var count=60;
			var verifyCodeInterval=setInterval(function(){
				$scope.sendSMSText=count-- + '秒后重发';
				$scope.$apply();
				if(count==0){
					clearInterval(verifyCodeInterval);
					$scope.sendSMSText='重新发送';
					$scope.lockEnabled=false;
					$scope.$apply();
				}
			},1000);
			
		},function(res){
			dialog.alert(res.errorMsg);
			$scope.lockEnabled=false;
		});
	}

	$scope.submitForm=function(){
		if(!$scope.showSms){
			$scope.verifyCode='';
		}
		var spinner2=dialog.showSpinner();
		var _paramsObj={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			user_doctor_id: $scope.doctorId,
			type: $scope.type,
			clinic_id: $scope.clinicId,
			service_id: $scope.serviceId,
			child_id: $scope.selectedChild.childId,
			child_name: $scope.selectedChild.childName,
			age: String($scope.selectedChild.age),
			booking_date: $scope.date,
			time: $scope.time?$scope.time:$scope.clinicBooking.time,
			mobile: $scope.mobile,
			verify_code: $scope.verifyCode
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