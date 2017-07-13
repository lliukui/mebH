app.controller('addGrowthCtrl',['$scope','$rootScope','HomeService','dialog','StorageConfig','$state','$stateParams',function($scope,$rootScope,HomeService,dialog,StorageConfig,$state,$stateParams){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		title: '添加数据'
	}

	$scope.dateText = '请选择测量时间';

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	if($stateParams.source=='createChild'){
		window.headerConfig.otherRightOperate={
            enable: true,
            html: '跳过',
            clickCall: function(){
            	$state.go('layout.user');
            }
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        $scope.returnUrl='layout.user';
	}else if($stateParams.source=='home'){
		$scope.returnUrl='layout.home';
	}else if($stateParams.source=='updateChild'){
		$scope.returnUrl='layout.user-childlist';
	}

	var sameDay=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
	$scope.date=sameDay;
	window.calendarConfig={
		title: sameDay,
		end_date: new Date(),
		selectedCallback: function(backDate){
			if(backDate){
				$scope.date=backDate.date;
			}
		}
	}

	$rootScope.$broadcast('setCalendarConfig', window.calendarConfig);
	$scope.addGrowth=function(){
		var spinner=dialog.showSpinner();
		var params={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			child_id: $stateParams.id,
			list: {
				'height': $scope.height,
				'weight': $scope.weight,
				'leg_length': $scope.leg_length,
				'head_circum': $scope.head_circum,
				'breast_circum': $scope.breast_circum,
				'waist_circum': $scope.waist_circum
			},
			time: $scope.date
		}

		HomeService.createchildgrowth(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			$state.go($scope.returnUrl);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert('请填写信息');
		});
	}
}]);