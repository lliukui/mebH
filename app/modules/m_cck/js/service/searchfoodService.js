app.service('searchfoodService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getfoodByValueDto(res){
		return res;
	}

	var service={
		getfoodByValue:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/searchfood?name='+urlOptions.value
			};
			return BaseHttpRequest.get(requestObj, getfoodByValueDto);
		}
	}
	return service;
}]);