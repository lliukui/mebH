app.controller('bookingOrderCtrl', ['$scope', '$rootScope', 'bookingService', 'StorageConfig', 'dialog', '$state', function($scope, $rootScope, bookingService, StorageConfig, dialog, $state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig = {
		title: '订单'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	getBookinglist();
	//获取预约列表
	function getBookinglist(){
		var spinner = dialog.showSpinner();
		bookingService.bookinglist({
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		}).then(function(res){
			dialog.closeSpinner(spinner.id);
			$scope.bookinglist = res.results;
		}, function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.cancel = function(order){
		dialog.confirm('请选择取消原因', {
			closeCallback: function(value){
				if(value == 0){
				}else{
					var spinner = dialog.showSpinner();
					var param = {
						username: StorageConfig.TOKEN_STORAGE.getItem('username'),
						token: StorageConfig.TOKEN_STORAGE.getItem('token'),
						reservationId: order.id,
						cancelReason: '其他'
					}
					bookingService.cancellbooking(param).then(function(res){
						dialog.closeSpinner(spinner.id);
						getBookinglist();
					}, function(res){
						dialog.closeSpinner(spinner.id);
						dialog.alert(res.errorMsg);
					});
				}
			}
		});
	}

	$scope.visit = function(_order){

	}

	$scope.update = function(_order){
		if(_order.canModify){
			StorageConfig.ORDER_STORAGE.putItem('dxyOrder', _order);
			$state.go('layout.booking-update', {
				id: _order.id
			});
		}else{
			dialog.toast('该订单不可修改');
		}
	}
}]);