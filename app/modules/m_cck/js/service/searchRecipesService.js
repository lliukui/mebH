app.service('searchRecipesService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getRecipesByValueDto(res){
		return res;
	}

	var service={
		getRecipesByValue:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/searchnr?title='+urlOptions.value
			};
			return BaseHttpRequest.get(requestObj,getRecipesByValueDto);
		}
	}
	return service;
}]);