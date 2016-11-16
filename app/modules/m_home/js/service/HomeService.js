app.service('HomeService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getChildsDto(res){
		return res;
	}

	var service={
		getChilds:function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/childprofilelist?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj,getChildsDto);
		}
	};
	return service;
}]);