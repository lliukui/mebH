app.service('userinfoService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function userinfoDto(res){
		return res;
	}

	function userfeedbackDto(res){
		return res;
	}

	var service={
		userinfo: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userprofile',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userinfoDto);
		},
		userfeedback: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userfeedback',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userfeedbackDto);
		}
	}
	return service;
}]);