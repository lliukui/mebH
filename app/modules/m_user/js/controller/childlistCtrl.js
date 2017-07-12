app.controller('childlistCtrl',['$scope','$rootScope','dialog','$state','childService','StorageConfig',function($scope,$rootScope,dialog,$state,childService,StorageConfig){
    $scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableBack: true,
		title: '监护儿童',
		enableRefresh: false
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
	}
	childService.getChild(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.childs=res.results.childs;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.update=function(child){
		StorageConfig.CHILD_STORAGE.putItem('child',child);
		$state.go('layout.user-updateChild',{
			id: child.childId
		})
	}
}]);