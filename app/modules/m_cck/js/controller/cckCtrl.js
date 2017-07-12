app.controller('cckCtrl',['$scope','$rootScope','$state','dialog','StorageConfig','$stateParams',function($scope,$rootScope,$state,dialog,StorageConfig,$stateParams){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableBack: false,
		title: '育儿宝库',
		enableRefresh: false,
	};
	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.goRouter=function(url){
		$state.go(url);
	}
	
	//是否显示footer
	if($stateParams.showFooter){
		StorageConfig.FOOTER_STORAGE.putItem('show', true);
	}

	$scope.goCollection=function(){
		if(!(StorageConfig.TOKEN_STORAGE.getItem('username')&&StorageConfig.TOKEN_STORAGE.getItem('username'))){
			dialog.confirm('请先登录',{
				closeCallback: function(value){
	  				if(value==0){
	  				}else{
						$state.go('layout.login',{
							from: 'layout.cck-collection'
						});
	  				}
	  			}
			});
		}else{
			$state.go('layout.cck-collection');
		}
	}
}]);