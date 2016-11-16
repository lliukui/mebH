app.service('CommonService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;
	function sendSMSCodeDto(res){
		return res;
	}

	var service={
		sendSMSCode:function(params){
			var requestObj={
				url: apiUrl+'/mebapi/smsverifycode',
				data: params
			};
			return BaseHttpRequest.post(requestObj, sendSMSCodeDto);
		}
	}
    return service;
}]);