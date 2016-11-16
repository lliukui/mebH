app.service('recipesService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getRecipesDto(res){
		return res;
	}

	var service={
		getRecipes:function(){
			var requestObj={
				url: apiUrl+'/mebapi/nrtitles'
			}
			return BaseHttpRequest.get(requestObj,getRecipesDto());
		}
	}
	return service;
}]);