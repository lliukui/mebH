app.controller('foodtitlesCtrl',['$scope','$rootScope','$state','foodtitlesService','dialog','$stateParams',function($scope,$rootScope,$state,foodtitlesService,dialog,$stateParams){
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

	$scope.goDetail=function(_contentUrl){
		$state.go('layout.cck-detail',{
			contentUrl: _contentUrl
		})
	}
}]);