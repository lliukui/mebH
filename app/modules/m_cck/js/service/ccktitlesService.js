app.service('ccktitlesService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;
	function getCcktitlesDto(res){
		return res;
	}

	var service={
		getCcktitles:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/ccktitles'
			};
			return BaseHttpRequest.get(requestObj,getCcktitlesDto);
		}
	}
	return service;
}]);