app.controller('feedbackCtrl',['$scope','$rootScope','StorageConfig','userinfoService','dialog','$state',function($scope,$rootScope,StorageConfig,userinfoService,dialog,$state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '反馈中心'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.submit=function(){
		var spinner=dialog.showSpinner();
		var params={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			mobile: $scope.mobile,
			message: $scope.message
		}
		userinfoService.userfeedback(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			$state.go('layout.user');
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);