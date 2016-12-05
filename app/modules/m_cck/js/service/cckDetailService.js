app.service('cckDetailService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getContentByUrlDto(res){
		return res;
	}

	function cckCollectionDto(res){
		return res;
	}

	function iscollectDto(res){
		return res;
	}

	var service={
		getContentByUrl: function(urlOptions){
			var requestObj={
				url: urlOptions.contentUrl
			};
			return BaseHttpRequest.get(requestObj, getContentByUrlDto);
		},
		cckCollection: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/usercollect',
				data: params
			}
			return BaseHttpRequest.post(requestObj, cckCollectionDto);
		},
		iscollect: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/iscollect?username='+urlOptions.username+'&token='+urlOptions.token+'&id='+urlOptions.id+'&type='+urlOptions.type
			}
			return BaseHttpRequest.get(requestObj, iscollectDto);
		}
	}
	return service;
}]);