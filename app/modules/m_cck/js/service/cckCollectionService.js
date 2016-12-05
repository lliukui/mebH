app.service('cckCollectionService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getCountcollectDto(res){
		return res;
	}

	function getCollectionDto(res){
		return res;
	}

	function cancelcollectDto(res){
		return res;
	}

	var service={
		getCountcollect: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/countcollect?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj,getCountcollectDto);
		},
		getCollection: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/usercollect?username='+urlOptions.username+'&token='+urlOptions.token+'&type='+urlOptions.type
			}
			return BaseHttpRequest.get(requestObj,getCollectionDto);
		},
		cancelcollect: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/cancelcollect?username='+urlOptions.username+'&token='+urlOptions.token+'&id='+urlOptions.id
			}
			return BaseHttpRequest.get(requestObj,cancelcollectDto);
		}
	}
	return service;
}]);