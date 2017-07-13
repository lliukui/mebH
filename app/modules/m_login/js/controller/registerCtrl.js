app.controller('registerCtrl', ['$scope', '$rootScope', '$state', 'CommonService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, CommonService, dialog, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '注册'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.showPwd=false;
	$scope.pwdInputType='password';
	$scope.checkShow=function(){
		$scope.showPwd=!$scope.showPwd;
		$scope.pwdInputType=$scope.showPwd?'text':'password';
	}

	$scope.sendSMSText='验证码';
	//发送验证码
	$scope.smsverifycode=function(){
		$scope.lockEnabled=true;
		var smsParams={
			mobile: $scope.mobile,
			action_type: 100
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

	$scope.register=function(){
		var spinner=dialog.showSpinner();
		var params={
			mobile: $scope.mobile,
			verify_code: $scope.verifyCode,
			password: $scope.password
		}
		CommonService.userregist(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			window.history.go(-1);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);