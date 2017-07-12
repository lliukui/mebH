app.controller('bookingUpdateCtrl', ['$scope', '$rootScope', 'doctorService', '$stateParams', 'StorageConfig', 'dialog', 'bookingService', '$state', function($scope, $rootScope, doctorService, $stateParams, StorageConfig, dialog, bookingService, $state){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig = {
		title: '修改订单'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.order = StorageConfig.ORDER_STORAGE.getItem('dxyOrder');
	var date = $scope.order.reservationTime.substring(0, $scope.order.reservationTime.indexOf(' '));
	$scope.dept_date = date;

	//预约医生
	//预约类型，第一次不执行
	var typeNum = true;
	$scope.optionsType = {
		text: '选择预约类型',
		title: '类型列表',
		data: [],
		backData: '',
		callback: function(_data){
			if(typeNum){
				typeNum = false;
			}else{
				getBookingDate();
			}
		}
	};

	if($scope.order.reservationType != 2){
		$scope.optionsType.data = [
			{key: 1, value: '初诊'},
			{key: 3, value: '儿童体检'},
			{key: 4, value: '成人体检'},
		];
	}else{
		$scope.optionsType.data = [
			{key: 1, value: '初诊'},
			{key: 2, value: '复诊'},
			{key: 3, value: '儿童体检'},
			{key: 4, value: '成人体检'},
		];
	}
	$scope.optionsType.backData = {
		key: $scope.order.reservationType,
		value: $scope.order.reservationType == '1' ? '初诊' : ($scope.order.reservationType == '2' ? '复诊' : ($scope.order.reservationType == '3' ? '儿童体检' : '成人体检'))
	}

	//第一次进入，默认选中科室
	var deptNum = true;
	//科室数据
	$scope.optionsDept = {
		text: '选择预约科室',
		title: '科室列表',
		data: [],
		backData: '',
		callback: function(_data){
			if(_data){
				var doctors = _data.doctor;
				if(doctors && doctors.length > 0){
					$scope.optionsDoctor.data = [];
					for(var i = 0; i < doctors.length; i++){
						var option = {};
						option.key = doctors[i].id;
						option.value = doctors[i].name;
						$scope.optionsDoctor.data.push(option);
						if(deptNum){
							if($scope.order.doctorName == doctors[i].name){
								deptNum = false;
								$scope.optionsDoctor.backData = option;
							}
						}else{
							if(i == 0){
								$scope.optionsDoctor.backData = option;
							}
						}
					}
				}
			}
		}
	};

	doctorService.getDoctorList().then(function(res){
		var doctorlist = res.results;
		if(doctorlist && doctorlist.length > 0){
			$scope.optionsDept.data = [];
			for(var i = 0; i < doctorlist.length; i++){
				var option = {};
				option.key = doctorlist[i].id;
				option.value = doctorlist[i].name;
				option.doctor = doctorlist[i].doctors;
				$scope.optionsDept.data.push(option);
				//判断
				if($scope.order.department == doctorlist[i].name){
					$scope.optionsDept.backData = option;
				}
			}
		}
	}, function(res){
		dialog.alert(res.errorMsg);
	});

	//医生数据
	$scope.optionsDoctor = {
		text: '选择预约医生',
		title: '医生列表',
		data: [],
		backData: '',
		callback: function(_data){
			if(_data){
				console.log(444);
				getBookingDate();
			}
		}
	};

	//第一次进入，默认展示时间
	var dateNum = true;
	//获取预约时间
	function getBookingDate(){
		var param = {
			date: new Date().getFullYear() + '' + ((new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + (new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate()),
			department: $scope.optionsDept.backData.key,
			reservationType: $scope.optionsType.backData.key,
			doctorId: $scope.optionsDoctor.backData.key,
			reservationId: '',
		}
		doctorService.getDutydate(param).then(function(res){
			if(dateNum){
				dateNum = false;
				getTime();
			}
			// 初始化日期
			window.calendarConfig={
				start_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
				end_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+7),
				passedDayList: res.results.passedDayList,
				unConfiguredList: res.results.unConfiguredList,
				unavailableDays: res.results.unavailableDays,
				selectedCallback: function(backData){
					if(backData){
						$scope.dept_date = backData.date;
						$scope.dateSelected=true;
						getTime();
					}
				}
			}

			$rootScope.$broadcast('setCalendarConfig', window.calendarConfig);
		}, function(res){
			dialog.alert(res.errorMsg);
		});
	}

	//第一次进入
	var timeNum = true;
	function getTime(){
		var dutytimeParam = {
			date: $scope.dept_date.replace(/-/g, ''),
			department: $scope.optionsDept.backData.key.toString(),
			reservationType: $scope.optionsType.backData.key,
			doctorId: $scope.optionsDoctor.backData.key
		}
		doctorService.getDutytime(dutytimeParam).then(function(res){
			var times = res.results;
			if(times){
				$scope.optionsTime.data = [];
				angular.forEach(times, function(time, index, array){
					var option = {};
					option.key = index;
					option.value = index;
					option.statu = (time == 0 || time == -1) ? 2 : 0;
					$scope.optionsTime.data.push(option);
					if(timeNum){
						var time = $scope.order.reservationTime.substring($scope.order.reservationTime.indexOf(' ') + 1);
						if(time == option.key){
							$scope.optionsTime.backData = option;
							timeNum = false;
						}
					}
				})
			}
		}, function(res){
			dialog.alert(res.errorMsg);
		});
	}

	//预约时间
	$scope.optionsTime = {
		text: '选择预约时间',
		title: '时间列表',
		data: [],
		backData: '',
		callback: function(){
		}
	}

	//预约
	$scope.submitDocForm = function(){
		if(!$scope.optionsDept.backData || $scope.optionsDept.backData == ''){
			dialog.toast('请选择科室');
			return;
		}
		if(!$scope.optionsDoctor.backData || $scope.optionsDoctor.backData == ''){
			dialog.toast('请选择医生');
			return;
		}
		if(!$scope.dept_date || $scope.dept_date == ''){
			dialog.toast('请选择日期');
			return;
		}
		if(!$scope.optionsTime.backData || $scope.optionsTime.backData == ''){
			dialog.toast('请选择时间');
			return;
		}
		var param = {
			reservationId: $scope.order.id.toString(),
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			name: $scope.order.name,
			mobileNumber: $scope.order.mobile,
			department: $scope.optionsDept.backData.key.toString(),
			doctorId: $scope.optionsDoctor.backData.key,
			reservationDate: $scope.dept_date + ' ' + $scope.optionsTime.backData.key,
			reservationType: $scope.optionsType.backData.key,
		}
		var spinner = dialog.showSpinner();
		bookingService.createBooking(param).then(function(res){
			dialog.closeSpinner(spinner.id);
			$state.go('layout.booking-order');
		}, function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);