app.service('cckDetailService',['BaseHttpRequest',function(BaseHttpRequest){
	function getContentByUrlDto(res){
		return res;
	}

	var service={
		getContentByUrl:function(urlOptions){
			var requestObj={
				url: urlOptions.contentUrl
			};
			return BaseHttpRequest.get(requestObj,getContentByUrlDto);
		}
	}
	return service;
}]);