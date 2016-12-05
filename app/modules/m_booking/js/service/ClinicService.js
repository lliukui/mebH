app.service('ClinicService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;
	function getClinicByCityDto(res){
		return res;
	}

	var service={
		getClinicByCity:function(urlOptions){
			// if(urlOptions['city_id']!=undefined){
			// 	var requestObj={
			// 		url: apiUrl+'/mebapi/searchclinic?city_id='+urlOptions.city_id
			// 	};
			// }else if(urlOptions['city_name']!=undefined){
			// 	var requestObj={
			// 		url: apiUrl+'/mebapi/searchclinic?city_name='+urlOptions.city_name
			// 	};
			// }
			var requestObj={
				url: apiUrl+'/mebapi/searchclinic'
			};
			return BaseHttpRequest.get(requestObj,getClinicByCityDto);
		}
	};
	return service;
}]);