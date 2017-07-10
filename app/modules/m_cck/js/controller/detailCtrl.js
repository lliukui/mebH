app.controller('detailCtrl',['$scope','$rootScope','$stateParams','cckDetailService','$sce','dialog','StorageConfig','$state',function($scope,$rootScope,$stateParams,cckDetailService,$sce,dialog,StorageConfig,$state){
	$scope.header = true;
	$scope.footer = false;
	var params={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		row_id: $stateParams.id,
		source_table: $stateParams.type
	}

	var detailStroage={
		contentUrl: $stateParams.contentUrl,
		id: $stateParams.id,
		type: $stateParams.type
	}

	window.headerConfig={
		enableBack: true,
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.contentUrl=$sce.trustAsResourceUrl($stateParams.contentUrl);

	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		id: $stateParams.id,
		type: $stateParams.type
	}
	cckDetailService.iscollect(urlOptions).then(function(res){
		readyBtn(res.status);
	},function(res){
		readyBtn(res.status);
	});

	function readyBtn(status){
		if(status=='ok'){
			window.headerConfig.otherRightOperate={
				enable: true,
				html: '已收藏'
			}
			$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
		}else{
			window.headerConfig.otherRightOperate={
				enable: true,
				html: '收藏',
				clickCall: function(){
					if(!(StorageConfig.TOKEN_STORAGE.getItem('username')&&StorageConfig.TOKEN_STORAGE.getItem('username'))){
						dialog.confirm('请先登录',{
							closeCallback: function(value){
								if(value==0){
								}else{
									StorageConfig.INTERCEPT_STORAGE.putItem('param',JSON.stringify(detailStroage));
										$state.go('layout.login',{
											from: 'layout.cck-detail'
										})
								}
							}
						});
						return false;
					}
					var spinner=dialog.showSpinner();
					cckDetailService.cckCollection(params).then(function(res){
						dialog.closeSpinner(spinner.id);
						dialog.toast('收藏成功');
						window.headerConfig.otherRightOperate.html='已收藏';
						window.headerConfig.otherRightOperate.clickCall='';
						$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
					},function(res){
						dialog.closeSpinner(spinner.id);
						dialog.alert(res.errorMsg);
					});
				}
			}
			$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
		}
	}
}]);