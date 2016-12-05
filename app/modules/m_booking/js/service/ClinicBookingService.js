app.service('ClinicBookingService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getDoctorByClinicIdAndServiceIdDto(res){
		return res;
	}

	function postClinicBookingDto(res){
		return res;
	}

	function bookingtimeDto(res){
		return res;
	}

	var service={
		getDoctorByClinicIdAndServiceId: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/clinicservicedoctor?username='+urlOptions.username+'&token='+urlOptions.token+'&clinic_id='+urlOptions.clinic_id+'&service_id='+urlOptions.service_id
			};
			return BaseHttpRequest.get(requestObj, getDoctorByClinicIdAndServiceIdDto);
		},
		postClinicBooking: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/createbooking',
				data: params
			}
			return BaseHttpRequest.post(requestObj, postClinicBookingDto);
		},
		bookingtime: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/bookingtime',
				data: params
			}
			return BaseHttpRequest.post(requestObj, bookingtimeDto);
		}
	}
	return service;
}]);