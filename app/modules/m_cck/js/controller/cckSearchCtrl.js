app.controller('cckSearchCtrl',['$scope','$rootScope','cckSearchService','dialog','$state',function($scope,$rootScope,cckSearchService,dialog,$state){
	$scope.header = true;
	$scope.footer = false;
	window.headerConfig={
		enableHeader: false
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.showBack=true;
	$scope.showNoResults=false;
	$scope.goBack=function(){
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

	$scope.clear=function(){
		$scope.searchValue='';
		$scope.showBack=true;
		$scope.showNoResults=false;
	}

	$scope.search=function(){
		var spinner=dialog.showSpinner();
		var urlOptions={
			searchValue: $scope.searchValue
		}
		cckSearchService.getCckSearch(urlOptions).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.showNoResults=true;
			$scope.results=res.results;
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goDetail=function(cck, _type){
		$state.go('layout.cck-detail',{
			contentUrl: cck.contentUrl,
			id: cck.id,
			type: _type
		});
	}

	$scope.goMusicinfo=function(_id){
		$state.go('layout.cck-musicinfo',{
			id: _id
		})
	}
}]);