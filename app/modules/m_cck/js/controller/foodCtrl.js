app.controller('foodCtrl', ['$scope', '$rootScope', '$state', 'StorageConfig', function($scope, $rootScope, $state, StorageConfig){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableBack: true,
		title: '能不能吃',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.goFoodtitles=function(_id){
		$state.go('layout.cck-foodtitles',{
			id: _id
		});
	}

	$scope.searchfood=function(){
		$state.go('layout.cck-searchfood');
	}
}])