app.controller('musicinfoCtrl',['$scope','$rootScope','dialog','$stateParams','musicinfoService','$sce',function($scope,$rootScope,dialog,$stateParams,musicinfoService,$sce){
	window.headerConfig={
		enableBack: true,
		title: '宝宝听听',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var requestObj={
		id: $stateParams.id
	}
	musicinfoService.getMusicinfo(requestObj).then(function(res){
		dialog.closeSpinner(spinner.id);
		$scope.musicinfoList=res.results.musicinfo;
	},function(res){
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errosMsg);
	});

	var audio=document.getElementById('audio');
	$scope.playMusic=function(_music){
		$scope.selectMusicUrl=$sce.trustAsResourceUrl(_music.musicUrl);
		$scope.selectMusicName=_music.name;
		audio.load();
		audio.play();
		$scope.showInfo=true;
		$scope.showPlay=false;
	}
	$scope.musicPlay=function(){
		audio.play();
		$scope.showPlay=false;
	}
	$scope.musicSuspend=function(){
		audio.pause();
		$scope.showPlay=true;
	}
}]);