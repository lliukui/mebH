app.controller('seeCollectionCtrl',['$scope','$rootScope','$state','dialog','StorageConfig','$stateParams','cckCollectionService',function($scope,$rootScope,$state,dialog,StorageConfig,$stateParams,cckCollectionService){
	window.headerConfig={
		title: '收藏'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		type: $stateParams.type
	}

	var spinner=dialog.showSpinner();
	readyCollection(spinner.id);

	//获取收藏信息
	function readyCollection(spinnerId){
		cckCollectionService.getCollection(urlOptions).then(function(res){
			dialog.closeSpinner(spinnerId);
			$scope.collectList=res.results.collect;
		},function(res){
			dialog.closeSpinner(spinnerId);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goDetail=function(collect){
		if($stateParams.type!='MusicCollection'){
			$state.go('layout.cck-detail',{
				contentUrl: collect.contentUrl,
				id: collect.modelId,
				type: $stateParams.type
			})
		}else{
			$state.go('layout.cck-musicinfo',{
				id: collect.modelId
			})
		}
		
	}

	$scope.cancelCollection=function(collect){
		var spinnerCancel=dialog.showSpinner();
		var urlOptions={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			id: collect.collectId
		}
		cckCollectionService.cancelcollect(urlOptions).then(function(res){
			readyCollection(spinnerCancel.id);
		},function(res){
			dialog.closeSpinner(spinnerCancelspinnerCancel.id.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);