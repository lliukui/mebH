app.controller('OrderCtrl',['$scope','$rootScope','OrderService','dialog',function($scope,$rootScope,OrderService,dialog){
	window.headerConfig={
		title: '订单列表',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: '15212789819',
		token: '6859CACBA01AAA721E65FD83F0AE19A2'
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

	$scope.cancelOrder=function(id){
		var spinner2=dialog.showSpinner();
		var options={
			username: '15212789819',
			token: '6859CACBA01AAA721E65FD83F0AE19A2',
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