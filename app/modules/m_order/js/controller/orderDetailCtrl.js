app.controller('orderDetailCtrl',['$scope','$rootScope','StorageConfig',function($scope,$rootScope,StorageConfig){
	window.headerConfig={
		title: '订单详情'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);
	
	$scope.order=StorageConfig.ORDER_STORAGE.getItem('detail');
	var refNo=$scope.order.refNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
	$scope.order.refNo=refNo;
}]);