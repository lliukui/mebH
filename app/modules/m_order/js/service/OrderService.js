app.service('OrderService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;
	function getOrderListDto(res){
		return res;
	}
	function cancelOrderByIdDto(res){
		return res;
	}

	var service={
		getOrderList: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/mybookings?username='+urlOptions.username+'&token='+urlOptions.token
			};
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		},
		cancelOrderById: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/bookingcancelled/'+urlOptions.id+'?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		}
	};
	return service;
}]);