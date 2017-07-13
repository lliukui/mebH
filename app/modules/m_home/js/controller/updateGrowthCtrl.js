app.controller('updateGrowthCtrl',['$scope','$rootScope','dialog','$state','StorageConfig','HomeService','$stateParams',function($scope,$rootScope,dialog,$state,StorageConfig,HomeService,$stateParams){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '修改数据'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var growthStorage=StorageConfig.GROWTH_STORAGE.getItem('growth');
	growthStorage.height=parseFloat(growthStorage.height);
	growthStorage.weight=parseFloat(growthStorage.weight);
	$scope.growthStorage=growthStorage;
	$scope.growth=angular.copy(growthStorage);

	$scope.updateGrowth=function(){
		var spinner=dialog.showSpinner();
		var params={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			child_id: $stateParams.id,
			time: $scope.growth.time
		}
		if($scope.growth.height!=$scope.growthStorage.height && $scope.growth.hid!=0){
			params.hid=$scope.growth.hid;
		}
		if($scope.growth.height!=$scope.growthStorage.height){
			params.height=$scope.growth.height;
		}
		if($scope.growth.weight!=$scope.growthStorage.weight && $scope.growth.wid!=0){
			params.wid=$scope.growth.wid;
		}
		if($scope.growth.weight!=$scope.growthStorage.weight){
			params.weight=$scope.growth.weight;
		}
		HomeService.updategrowth(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			window.history.go(-1);
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);