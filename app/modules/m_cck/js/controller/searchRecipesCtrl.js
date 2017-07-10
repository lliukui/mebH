app.controller('searchRecipesCtrl',['$scope','$rootScope','dialog','$state','searchRecipesService',function($scope,$rootScope,dialog,$state,searchRecipesService){
	$scope.header = true;
	$scope.footer = false;
	window.headerConfig={
		enableHeader: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.showBack=true;
	$scope.showNoResults=false;
	$scope.valueChange=function(){
		if($scope.searchValue!=''){
			$scope.showBack=false;
		}else{
			$scope.showBack=true;
		}
		$scope.showNoResults=false;
	}

	$scope.clear=function(){
		$scope.searchValue='';
		$scope.showBack=true;
		$scope.showNoResults=false;
	}

	$scope.back=function(){
		window.history.go(-1);
	}

	$scope.search=function(){
		var spinner=dialog.showSpinner();
		var urlOptions={
			value: $scope.searchValue
		}
		searchRecipesService.getRecipesByValue(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
		$scope.showNoResults=true;
			$scope.nrInfos=res.results.nrInfo;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goDetail=function(nrInfo){
		$state.go('layout.cck-detail', {
			contentUrl: nrInfo.contentUrl,
			id: nrInfo.id,
			type: 'NutritionRecipesInfo'
		});
	}
}]);