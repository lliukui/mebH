app.service('musicinfoService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getMusicinfoDto(res){
		return res;
	}

	var service={
		getMusicinfo: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/musicinfo/'+urlOptions.id
			}
			return BaseHttpRequest.get(requestObj,getMusicinfoDto);
		}
	}
	return service;
}]);