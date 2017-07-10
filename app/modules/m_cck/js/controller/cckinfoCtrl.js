app.controller('cckinfoCtrl',['$scope','$rootScope','$stateParams','cckinfoService','dialog','$state',function($scope,$rootScope,$stateParams,cckinfoService,dialog,$state){
	$scope.header = true;
	$scope.footer = false;
	window.headerConfig={
		enableBack: true,
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		id: $stateParams.id
	}
	cckinfoService.getCckinfoById(urlOptions).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.cckInfos=res.results.cckInfo;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.goDetail=function(cckInfo){
		$state.go('layout.cck-detail',{
			contentUrl: cckInfo.contentUrl,
			id: cckInfo.id,
			type: 'CckInfo'
		});
	}
}]);