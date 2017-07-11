app.service('doctorService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function getDoctorListDto(res){
		return res;
	}

	function getDeptListDto(res){
		return res;
	}

	function getDutydateDto(res){
		return res;
	}

	function getDutytimeDto(res){
		return res;
	}

	var service={
		getDoctorList: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/dxyapi/doctorlist'
			}
			return BaseHttpRequest.get(requestObj, getDoctorListDto);
		},
		getDeptList: function(){
			var requestObj = {
				url: apiUrl + '/dxyapi/deptlist'
			}
			return BaseHttpRequest.get(requestObj, getDeptListDto);
		},
		getDutydate: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/dxyapi/dutydate?date=' + urlOptions.date + '&department=' + urlOptions.department + '&doctorId=' + urlOptions.doctorId + '&reservationType=' + urlOptions.reservationType,
			}
			return BaseHttpRequest.get(requestObj, getDutydateDto);
		},
		getDutytime: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/dxyapi/dutytime?date=' + urlOptions.date + '&department=' + urlOptions.department + '&reservationType=' + urlOptions.reservationType + '&doctorId=' + urlOptions.doctorId,
			}
			return BaseHttpRequest.get(requestObj, getDutytimeDto);
		}
	}

	return service;
}]);