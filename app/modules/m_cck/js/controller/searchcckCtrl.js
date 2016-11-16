app.controller('searchcckCtrl',['$scope','$rootScope','searchcckService','dialog','$state',function($scope,$rootScope,searchcckService,dialog,$state){
	window.headerConfig={
		enableHeader: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.showBack=true;
	$scope.goBack=function(){
		window.history.go(-1);
	}

	$scope.searchcck=function(){
		var spinner=dialog.showSpinner();
		var urlOptions={
			value: $scope.searchValue
		}
		searchcckService.getcckinfoByValue(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.cckInfos=res.results.cckInfo;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.valueChange=function(){
		if($scope.searchValue!=0){
			$scope.showBack=false;
		}else{
			$scope.showBack=true;
		}
	}

	$scope.clear=function(){
		$scope.searchValue='';
		$scope.showBack=true;
	}

	$scope.goDetail=function(_contentUrl){
		$state.go('layout.cck-detail',{
			contentUrl: _contentUrl
		});
	}
}]);