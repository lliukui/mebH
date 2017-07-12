app.controller('userinfoCtrl',['$scope','$rootScope','StorageConfig','userinfoService','dialog','$state',function($scope,$rootScope,StorageConfig,userinfoService,dialog,$state){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		title: '用户信息'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var user=new Object();
	user.name=StorageConfig.TOKEN_STORAGE.getItem('name');
	user.nickname=StorageConfig.TOKEN_STORAGE.getItem('nickname');
	user.gender=StorageConfig.TOKEN_STORAGE.getItem('gender');
	$scope.user=user;

	$scope.submit=function(){
		var spinner=dialog.showSpinner();
		var params={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			name: $scope.name,
			nickname: $scope.nickname,
			gender: $scope.gender
		}
		userinfoService.userinfo(params).then(function(res){
			StorageConfig.TOKEN_STORAGE.putItem('name', $scope.name);
			StorageConfig.TOKEN_STORAGE.putItem('nickname', $scope.nickname);
			StorageConfig.TOKEN_STORAGE.putItem('gender', $scope.gender=='F'?'男':'女');
			dialog.closeSpinner(spinner.id);
			$state.go('layout.user');
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);