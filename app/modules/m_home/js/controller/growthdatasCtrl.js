app.controller('growthdatasCtrl',['$scope','$rootScope','dialog','StorageConfig','$stateParams','HomeService','$state',function($scope,$rootScope,dialog,StorageConfig,$stateParams,HomeService,$state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '成长数据'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		childId: $stateParams.id
	}
	HomeService.growthdatas(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.growthdatas=res.results.growth;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.selectedData=-1;
	$scope.selected=function(_index, growthdata){
		$scope.selectedData=_index;
		StorageConfig.GROWTH_STORAGE.putItem('growth', growthdata);
	}

	$scope.update=function(){
		$state.go('layout.home-updateGrowth', {
			id: $stateParams.id
		});
	}
}]);