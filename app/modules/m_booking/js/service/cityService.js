app.service('cityService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getCityDto(res){
		return res;
	}

	var service={
		getCity: function(){
			var requestObj={
				url: apiUrl+'/mebapi/citylist'
			}
			return BaseHttpRequest.get(requestObj,getCityDto);
		}
	}
	return service;
}]);