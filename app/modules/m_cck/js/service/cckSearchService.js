app.service('cckSearchService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getCckSearchDto(res){
		return res;
	}

	var service={
		getCckSearch: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/searchall?title='+urlOptions.searchValue
			}
			return BaseHttpRequest.get(requestObj, getCckSearchDto);
		}
	}
	return service;
}]);