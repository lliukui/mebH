app.controller('foodtitlesCtrl', ['$scope', '$rootScope', '$state', 'foodtitlesService', 'dialog', '$stateParams', 'StorageConfig', function($scope, $rootScope, $state, foodtitlesService, dialog, $stateParams, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		enableBack: true,
		title: '',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var id=$stateParams.id;

	var spinner=dialog.showSpinner();
	foodtitlesService.getFoodtitles().then(function(res){
		dialog.closeSpinner(spinner.id);
		angular.forEach(res.results.food,function(food,index,array){
			if(food.id==id){
				$scope.foods=food.foodInfo;
				window.headerConfig.title=food.categoryName;
				$rootScope.$broadcast('setHeaderConfig',window.headerConfig);
			}
		});
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.goDetail=function(food){
		$state.go('layout.cck-detail',{
			contentUrl: food.contentUrl,
			id: food.foodId,
			type: 'FoodInfo'
		})
	}
}]);