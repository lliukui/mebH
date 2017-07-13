app.controller('musictitlesCtrl', ['$scope', '$rootScope', '$state', 'dialog', 'musictitlesService', 'StorageConfig', function($scope, $rootScope, $state, dialog, musictitlesService, StorageConfig){
    $scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		enableBack: true,
		title: '宝宝听听',
		enableRefresh: false
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

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

    $scope.selectedCategory = 0;
    //返回时，默认展示先前选中
    var musicNav = StorageConfig.CCK_STORAGE.getItem('musicNav');
    if(musicNav && musicNav != ''){
        $scope.selectedCategory = musicNav;
    }

    $scope.checkNav=function(_categoryName){
    	$scope.selectedCategory = _categoryName;
        StorageConfig.CCK_STORAGE.putItem('musicNav', _categoryName);
    	document.getElementById('layoutContent').scrollTop = 0;
    }

    $scope.goMusic=function(_data){
        StorageConfig.CCK_STORAGE.putItem('musictitle', _data.collectionName);
    	$state.go('layout.cck-musicinfo',{
    		id: _data.collectionId
    	});
    }
}]);