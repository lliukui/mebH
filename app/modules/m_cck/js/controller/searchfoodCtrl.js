app.controller('searchfoodCtrl',['$scope','$rootScope','searchfoodService','dialog','$state',function($scope,$rootScope,searchfoodService,dialog,$state){
	window.headerConfig={
		enableHeader: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.showBack=true;
	$scope.showNoResults=false;
	$scope.clear=function(){
		$scope.showBack=true;
		$scope.searchValue='';
		$scope.showNoResults=false;
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
		$scope.showNoResults=false;
	}

	$scope.search=function(){
		var spinner=dialog.showSpinner();
		var urlOptions={
			value: $scope.searchValue
		}
		searchfoodService.getfoodByValue(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.showNoResults=true;
			$scope.foodinfos=res.results.foodinfo;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goDetail=function(foodinfo){
		$state.go('layout.cck-detail',{
			contentUrl: foodinfo.contentUrl,
			id: foodinfo.id,
			type: 'FoodInfo'
		})
	}
}]);