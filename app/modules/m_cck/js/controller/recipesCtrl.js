app.controller('recipesCtrl',['$scope','$rootScope','recipesService','dialog','$state',function($scope,$rootScope,recipesService,dialog,$state){
	window.headerConfig={
		enableBack: true,
		title: '营养食谱',
		enableRefresh: false
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();

	recipesService.getRecipes().then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.recipesList=res.results.nutritionRecipes;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	var recipesNavScroll=new IScroll('#recipesNavScroll',{
		scrollX: true,
        scrollY: false,
        mouseWheel: false,
        click: true
	});
	setInterval(function(){
		recipesNavScroll.refresh();
	},1000);

	$scope.selectedAgeGroup=0;

	$scope.clickNav=function(ageGroup){
		$scope.selectedAgeGroup=ageGroup;
	}

	$scope.goDetail=function(nrInfo){
		$state.go('layout.cck-detail',{
			contentUrl: nrInfo.contentUrl,
			id: nrInfo.infoId,
			type: 'NutritionRecipesInfo'
		});
	}

	$scope.goSearchRecipes=function(){
		$state.go('layout.cck-searchRecipes');
	}
}]);