app.service('HomeService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getChildsDto(res){
		return res;
	}

	function childgrowthDto(res){
		return res;
	}

	function createchildgrowthDto(res){
		return res;
	}

	function readremindDto(res){
		return res;
	}

	function growthdatasDto(res){
		return res;
	}

	function updategrowthDto(res){
		return res;
	}

	var service={
		getChilds: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/childprofilelist?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj, getChildsDto);
		},
		childgrowth: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/childgrowth?username='+urlOptions.username+'&token='+urlOptions.token+'&child_id='+urlOptions.childId
			}
			return BaseHttpRequest.get(requestObj, childgrowthDto);
		},
		createchildgrowth: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/createchildgrowth',
				data: params
			}
			return BaseHttpRequest.post(requestObj, createchildgrowthDto);
		},
		readremind: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/readremind?username='+urlOptions.username+'&token='+urlOptions.token
			}
			return BaseHttpRequest.get(requestObj, readremindDto);
		},
		growthdatas: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/growthdatas?username='+urlOptions.username+'&token='+urlOptions.token+'&child_id='+urlOptions.childId
			}
			return BaseHttpRequest.get(requestObj, growthdatasDto);
		},
		updategrowth: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/updategrowth',
				data: params
			}
			return BaseHttpRequest.post(requestObj, updategrowthDto);
		}
	};
	return service;
}]);