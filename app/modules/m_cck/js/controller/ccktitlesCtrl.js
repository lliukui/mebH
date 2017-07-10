app.controller('ccktitlesCtrl',['$scope','$rootScope','ccktitlesService','dialog','$state',function($scope,$rootScope,ccktitlesService,dialog,$state){
	$scope.header = true;
	$scope.footer = false;
	window.headerConfig={
		enableBack: true,
		title: '育儿知识',
		enableRefresh: false
	};
	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.selectedAgeGroup=0;

	var spinner=dialog.showSpinner();
	ccktitlesService.getCcktitles().then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.cck=res.results.cck;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.clickNav=function(ageGroup){
		$scope.selectedAgeGroup=ageGroup;
	}
	
	var ccktitlesNavScroll = new IScroll('#ccktitlesNavScroll', {
        scrollX: true,
        scrollY: false,
        mouseWheel: false,
        click: true
    });
    setInterval(function(){
        ccktitlesNavScroll.refresh();
    },1000);


    $scope.gocckinfo=function(_id){
    	$state.go('layout.cck-cckinfo',{
    		id: _id
    	});
    }

    $scope.goSearchcck=function(){
    	$state.go('layout.cck-searchcck');
    }
}]);