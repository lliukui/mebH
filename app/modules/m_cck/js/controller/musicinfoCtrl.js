app.controller('musicinfoCtrl',['$scope','$rootScope','dialog','$stateParams','musicinfoService','$sce','cckDetailService','StorageConfig','$state',function($scope,$rootScope,dialog,$stateParams,musicinfoService,$sce,cckDetailService,StorageConfig,$state){
	var params={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		row_id: $stateParams.id,
		source_table: 'MusicCollection'
	}
	
	var detailStroage={
		id: $stateParams.id,
	}

	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		id: $stateParams.id,
		type: 'MusicCollection'
	}

	window.headerConfig={
		enableBack: true,
		title: '宝宝听听',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	//音乐列表
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

	//是否收藏
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
	  									from: 'layout.cck-musicinfo'
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

	//播放音乐
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