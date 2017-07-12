app.controller('OrderCtrl',['$scope','$rootScope','OrderService','dialog','StorageConfig','$state',function($scope,$rootScope,OrderService,dialog,StorageConfig,$state){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
	window.headerConfig={
		title: '订单列表',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token')
	}

	getOrderData(spinner.id);

	function getOrderData(spinnerId){
		OrderService.getOrderList(urlOptions).then(function(res){
			dialog.closeSpinner(spinnerId);
			$scope.allBookings=res.results.allBookings;
			$scope.doneBookings=res.results.doneBookings;
		},function(res){
			dialog.closeSpinner(spinnerId);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.selectTab=0;
	$scope.checkTab=function(_index){
		$scope.selectTab=_index;
	}

	//查看详情
	$scope.detail=function(order){
		StorageConfig.ORDER_STORAGE.putItem('detail', order);
		$state.go('layout.order-detail');
	}

	$scope.cancelOrder=function(id){
		var spinner2=dialog.showSpinner();
		var options={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			id: id
		}
		OrderService.cancelOrderById(options).then(function(res){
			if(res.status=='ok'){
				getOrderData(spinner2.id);
			}
		},function(res){
			dialog.closeSpinner(spinner2.id);
			dialog.alert(res);
		});
	}
}]);