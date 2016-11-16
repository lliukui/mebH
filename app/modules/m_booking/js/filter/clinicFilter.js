app.filter('clinicServiceIcon',[function(){
	return function(serviceId){
		switch(serviceId){
			case '1':{
				return 'app/images/icon_healthcare.png';
			}
			case '2':{
				return 'app/images/icon_allergy.png';
			}
			case '3':{
				return 'app/images/icon_asthma.png';
			}
			case '4':{
				return 'app/images/icon_consult.png';
			}
			case '5':{
				return 'app/images/icon_development.png';
			}
			case '6':{
				return 'app/images/icon_massage.png';
			}
		}
	}
}]);