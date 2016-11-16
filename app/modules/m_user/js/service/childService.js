app.service('childService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getChildDto(res){
		return res;
	}

	function createChildDto(res){
		return res;
	}

	var service={
		getChild: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/childprofilelist?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj,getChildDto);
		},
		createChild: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/createchild',
				data: params
			}
			return BaseHttpRequest.post(requestObj,createChildDto);
		}
	}
	return service;
}]);