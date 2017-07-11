app.service('bookingService', ['BaseHttpRequest', function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function createbookingDto(res){
		return res;
	}

	function bookinglistDto(res){
		return res;
	}

	function cancellbookingDto(res){
		return res;
	}

	function bookinglistDto(res){
		return res;
	}

	function cancellbookingDto(res){
		return res;
	}

	var service = {
		createBooking: function(param){
			var requestObj = {
				url: apiUrl + '/dxyapi/createbooking',
				data: param
			}
			return BaseHttpRequest.post(requestObj, createbookingDto);
		},
		bookinglist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/dxyapi/bookinglist?username=' + urlOptions.username + '&token=' + urlOptions.token
			}
			return BaseHttpRequest.post(requestObj, bookinglistDto);
		},
		cancellbooking: function(param){
			var requestObj = {
				url: apiUrl + '/dxyapi/cancellbooking',
				data: param
			}
			return BaseHttpRequest.post(requestObj, cancellbookingDto);
		},
		bookinglist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/dxyapi/bookinglist?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, bookinglistDto);
		},
		cancellbooking: function(param){
			var requestObj = {
				url: apiUrl + '/dxyapi/cancellbooking',
				data: param
			}
			return BaseHttpRequest.post(requestObj, cancellbookingDto);
		}
	}

	return service;
}]);