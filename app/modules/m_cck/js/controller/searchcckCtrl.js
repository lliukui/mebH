app.controller('searchcckCtrl', ['$scope', '$rootScope', 'searchcckService', 'dialog', '$state', 'StorageConfig', function($scope, $rootScope, searchcckService, dialog, $state, StorageConfig){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableHeader: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.showBack=true;
	$scope.showNoResults=false;
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
			$scope.showNoResults=true;
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
		$scope.showNoResults=false;
	}

	$scope.clear=function(){
		$scope.searchValue='';
		$scope.showBack=true;
		$scope.showNoResults=false;
	}

	$scope.goDetail=function(cckInfo){
		$state.go('layout.cck-detail',{
			contentUrl: cckInfo.contentUrl,
			id: cckInfo.id,
			type: 'CckInfo'
		});
	}
}]);