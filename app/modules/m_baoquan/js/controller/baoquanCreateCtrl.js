app.controller('baoquanCreateCtrl', ['$scope', '$rootScope', 'StorageConfig', 'dialog', 'baoquanService', '$state', '$stateParams', function($scope, $rootScope, StorageConfig, dialog, baoquanService, $state, $stateParams){
	$scope.header = true;
	$scope.footer = true;

	window.headerConfig = {
		title: '新增宝宝圈'
	}
	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.create = function(){
		var spinner = dialog.showSpinner();
		var param = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			child_id: $stateParams.id,
			title: $scope.title,
			content: $scope.content,
			address: $scope.address
		}
		baoquanService.createchildcircle(param).then(function(res){
			dialog.closeSpinner(spinner.id);
			$state.go('layout.baoquan-upload', {
				id: res.results.id,
			})
		}, function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);