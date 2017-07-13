app.controller('cckCollectionCtrl',['$scope','$rootScope','cckCollectionService','dialog','$state','StorageConfig',function($scope,$rootScope,cckCollectionService,dialog,$state,StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '收藏'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token')
	}
	var spinner=dialog.showSpinner();

	cckCollectionService.getCountcollect(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.count=res.results.count;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.seeCollection=function(_type){
		$state.go('layout.cck-seeCollection',{
			type: _type
		});
	}
}]);