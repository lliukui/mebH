app.controller('calendarCtrl',['$scope','$rootScope',function($scope,$rootScope){
	window.headerConfig={
		title: '时间弹窗'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	window.calendarConfig={
		title: '点击我弹出时间',
		start_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
		end_date: '',
		selectedCallback: function(backDate){
			if(backDate){
				console.log(backDate);
			}
		}
	}

	$rootScope.$broadcast('setCalendarConfig', window.calendarConfig);
}]);