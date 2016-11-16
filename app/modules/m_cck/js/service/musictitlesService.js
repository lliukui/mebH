app.service('musictitlesService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getMusictitlesDto(res){
		return res;
	}

	var service={
		getMusictitles: function(){
			var requestObj={
				url: apiUrl+'/mebapi/musictitles'
			};
			return BaseHttpRequest.get(requestObj,getMusictitlesDto);
		}
	}
	return service;
}]);