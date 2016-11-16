app.filter('timeFilter',[function(){
	return function(timeList,selectedList){
		if(selectedList.length>0){
			angular.forEach(selectedList,function(selected,index,array){
				var index=timeList.lastIndexOf(selected);
				if(index!=-1){
					timeList.splice(index,1);
				}
			});
		}
		var allTimeList=[
			'08:00',
			'08:30',
			'09:00',
			'09:30',
			'10:00',
			'10:30',
			'11:00',
			'11:30',
			'14:00',
			'14:30',
			'15:00',
			'15:30',
			'16:00',
			'16:30',
			'17:00',
			'17:30',
		];
		var returnArray=[];
		angular.forEach(allTimeList,function(allTime,index,array){
			var index=timeList.lastIndexOf(allTime);
			if(index!=-1){
				returnArray.push({'optional':true,'timeText':allTime});
			}else{
				returnArray.push({'optional':false,'timeText':allTime});
			}
		});
		return returnArray;
	}
}]);