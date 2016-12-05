app.controller('loginCtrl',['$scope','$rootScope','CommonService','dialog','$stateParams','$state','StorageConfig',function($scope,$rootScope,CommonService,dialog,$stateParams,$state,StorageConfig){
	window.headerConfig={
		title: '登录',
        otherRightOperate: {
            enable: true,
            html: '注册',
            clickCall: function(){
            	$state.go('layout.register');
            }
        },
	};

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
	
	$scope.selectedTab=0;
	$scope.checkTab=function(_index){
		$scope.selectedTab=_index;
	}

	$scope.from=$stateParams.from?$stateParams.from:'layout.home';
	$scope.intercept=StorageConfig.INTERCEPT_STORAGE.getItem('param');

	$scope.loginPwd=function(){
		var spinner=dialog.showSpinner();
		var params={
			mobile: $scope.mobilePwd,
			password: $scope.passwordPwd
		}
		CommonService.pawlogin(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			StorageConfig.TOKEN_STORAGE.putItem('username',$scope.mobilePwd);
			StorageConfig.TOKEN_STORAGE.putItem('token',res.results.userinfo.token);
			StorageConfig.TOKEN_STORAGE.putItem('uid',res.results.userinfo.uid);
			StorageConfig.TOKEN_STORAGE.putItem('name', res.results.userinfo.name);
			StorageConfig.TOKEN_STORAGE.putItem('nickname', res.results.userinfo.username);
			StorageConfig.TOKEN_STORAGE.putItem('gender', res.results.userinfo.gender);
			$state.go($scope.from,eval('(' + $scope.intercept + ')'));
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

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
		var spinner=dialog.showSpinner();
		var loginParams={
			mobile: $scope.mobile,
			verify_code: $scope.verify_code
		}
		CommonService.userlogin(loginParams).then(function(res){
			dialog.closeSpinner(spinner.id);
			StorageConfig.TOKEN_STORAGE.putItem('username',$scope.mobile);
			StorageConfig.TOKEN_STORAGE.putItem('token',res.results.userinfo.token);
			StorageConfig.TOKEN_STORAGE.putItem('uid',res.results.userinfo.uid);
			StorageConfig.TOKEN_STORAGE.putItem('name', res.results.userinfo.name);
			StorageConfig.TOKEN_STORAGE.putItem('nickname', res.results.userinfo.username);
			StorageConfig.TOKEN_STORAGE.putItem('gender', res.results.userinfo.gender);
			$state.go($scope.from,eval('(' + $scope.intercept + ')'));
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.forgetPwd=function(){
		$state.go('layout.forgetpwd');
	}
}]);