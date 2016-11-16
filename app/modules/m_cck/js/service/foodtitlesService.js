app.service('foodtitlesService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getFoodtitlesDto(res){
		return res;
	}

	var service={
		getFoodtitles:function(){
			var requestObj={
				url: apiUrl+'/mebapi/foodtitles'
			};
			return BaseHttpRequest.get(requestObj,getFoodtitlesDto);
		}
	}
	return service;
}]);