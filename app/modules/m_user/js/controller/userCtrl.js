app.controller('userCtrl',['$scope','$rootScope','$state','childService','dialog',function($scope,$rootScope,$state,childService,dialog){
	window.headerConfig={
		enableBack: false,
		title: '个人中心',
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
		var childs=res.results.childs;
		if(childs.length>0){
			angular.forEach(childs,function(child,index,array){
				if(child.isDefault==1){
					$scope.child=child;
					console.log($scope.child);
				}
			});
		}
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(errorMsg);
	});

	$scope.goRouter=function(_url){
		$state.go(_url);
	}
}]);