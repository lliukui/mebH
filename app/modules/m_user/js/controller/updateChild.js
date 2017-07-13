app.controller('updateChildCtrl',['$scope','$rootScope','$state','dialog','$stateParams','StorageConfig',function($scope,$rootScope,$state,dialog,$stateParams,StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '编辑宝宝信息',
	}

	$rootScope.$broadcast('setHeaderConfig',window,headerConfig);

	$scope.child=StorageConfig.CHILD_STORAGE.getItem('child');

	$scope.addGrowth=function(){
		$state.go('layout.home-addGrowth', {
			id: $stateParams.id,
			source: 'updateChild'
		});
	}
}])