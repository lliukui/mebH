app.controller('loginCtrl',['$scope','$rootScope','CommonService','dialog',function($scope,$rootScope,CommonService,dialog){
	window.headerConfig={
		enableBack: false,
		title: '登录',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
	$scope.sendSMSText='验证码';
	//发送验证码
	$scope.smsverifycode=function(){
		$scope.lockEnabled=true;
		var smsParams={
			mobile: $scope.mobile,
			action_type: 102
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
	$scope.login=function(){
		
	}
}]);