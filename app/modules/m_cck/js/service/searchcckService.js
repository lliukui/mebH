app.service('searchcckService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getcckinfoByValueDto(res){
		return res;
	}

	var service={
		getcckinfoByValue:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/searchcck?title='+urlOptions.value
			}
			return BaseHttpRequest.get(requestObj,getcckinfoByValueDto);
		}
	}
	return service;
}]);