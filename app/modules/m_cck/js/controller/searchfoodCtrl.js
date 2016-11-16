app.controller('searchfoodCtrl',['$scope','$rootScope','searchfoodService','dialog','$state',function($scope,$rootScope,searchfoodService,dialog,$state){
	window.headerConfig={
		enableHeader: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.showBack=true;

	$scope.clear=function(){
		$scope.showBack=true;
		$scope.searchValue='';
	}

	$scope.back=function(){
		window.history.go(-1);
	}

	$scope.valueChange=function(){
		if($scope.searchValue!=''){
			$scope.showBack=false;
		}else{
			$scope.showBack=true;
		}
	}

	$scope.search=function(){
		var spinner=dialog.showSpinner();
		var urlOptions={
			value: $scope.searchValue
		}
		searchfoodService.getfoodByValue(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.foodinfos=res.results.foodinfo;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goDetail=function(_contentUrl){
		$state.go('layout.cck-detail',{
			contentUrl: _contentUrl
		})
	}
}]);