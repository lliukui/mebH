app.service('cckinfoService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;
	function getCckinfoByIdDto(res){
		return res;
	}

	var service={
		getCckinfoById:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/cckinfo/'+urlOptions.id
			};
			return BaseHttpRequest.get(requestObj,getCckinfoByIdDto);
		}
	}
	return service;
}]);