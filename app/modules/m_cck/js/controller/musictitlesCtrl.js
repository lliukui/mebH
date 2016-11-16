app.controller('musictitlesCtrl',['$scope','$rootScope','$state','dialog','musictitlesService',function($scope,$rootScope,$state,dialog,musictitlesService){
	window.headerConfig={
		enableBack: true,
		title: '宝宝听听',
		enableRefresh: false
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	musictitlesService.getMusictitles().then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.musicList=res.results.music;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});


	var musictitlesNavScroll = new IScroll('#musictitlesNavScroll', {
        scrollX: true,
        scrollY: false,
        mouseWheel: false,
        click: true
    });
    setInterval(function(){
        musictitlesNavScroll.refresh();
    },1000);

    $scope.selectedCategory=0;

    $scope.checkNav=function(_categoryName){
    	$scope.selectedCategory=_categoryName;
    	document.getElementById('layoutContent').scrollTo(0);
    }

    $scope.goMusic=function(_id){
    	$state.go('layout.cck-musicinfo',{
    		id: _id
    	});
    }
}]);