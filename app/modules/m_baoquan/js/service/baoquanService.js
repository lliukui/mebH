app.service('baoquanService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function createchildcircleDto(res){
		return res;
	}

	function getTokenDto(res){
		return res;
	}

	function createcirclefileDto(res){
		return res;
	}

	function childcirclelistDto(res){
		return res;
	}

	var service = {
		createchildcircle: function(param){
			var requestObj = {
				url: apiUrl + '/mebapi/createchildcircle',
				data: param
			}
			return BaseHttpRequest.post(requestObj, createchildcircleDto);
		},
		getToken: function(){
			var requestObj = {
				url: apiUrl + '/mebapi/childtoken',
			}
			return BaseHttpRequest.get(requestObj, getTokenDto);
		},
		createcirclefile: function(param){
			var requestObj = {
				url: apiUrl + '/mebapi/createcirclefile',
				data: param
			}
			return BaseHttpRequest.post(requestObj, createcirclefileDto);
		},
		childcirclelist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/childcirclelist?username=' + urlOptions.username + '&token=' +　urlOptions.token　+　'&child_id=' + urlOptions.child_id,
			}
			return BaseHttpRequest.get(requestObj, childcirclelistDto);
		}
	}

	return service;
}]);