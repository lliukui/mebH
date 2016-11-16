app.controller('childlistCtrl',['$scope','$rootScope','dialog','$state','childService','StorageConfig',function($scope,$rootScope,dialog,$state,childService,StorageConfig){
	window.headerConfig={
		enableBack: true,
		title: '监护儿童',
		enableRefresh: false
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: '15212789819',
        token: '6859CACBA01AAA721E65FD83F0AE19A2'
	}
	childService.getChild(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.childs=res.results.childs;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.create=function(){
		$state.go('layout.user-createChild');
	}

	$scope.update=function(child){
		StorageConfig.CHILD_STORAGE.putItem('child',child);
		$state.go('layout.user-updateChild',{
			id: child.childId
		})
	}
}]);