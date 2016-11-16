app.controller('updateChildCtrl',['$scope','$rootScope','$state','dialog','$stateParams','StorageConfig',function($scope,$rootScope,$state,dialog,$stateParams,StorageConfig){
	window.headerConfig={
		title: '编辑宝宝信息',
	}

	$rootScope.$broadcast('setHeaderConfig',window,headerConfig);

	$scope.child=StorageConfig.CHILD_STORAGE.getItem('child');
}])