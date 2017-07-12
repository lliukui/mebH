app.controller('userCtrl', ['$scope', '$rootScope', '$state', 'childService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, childService, dialog, StorageConfig){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		enableBack: false,
		title: '个人中心',
        otherRightOperate: {
            enable: true,
            html: '添加宝宝',
            clickCall: function(){
            	$state.go('layout.user-createChild');
            }
        }
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.goRouter=function(_url){
		$state.go(_url);
	}
}]);