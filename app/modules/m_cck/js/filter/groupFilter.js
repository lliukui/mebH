app.filter('groupFilter',[function(){
	return function(inputArray){
        var array = [];
        var inner = [];
        // for(var i=0;i<inputArray.length;i++){
        //     if(i%2!==0){
        //     	inner.push(array);
        //     	console.log(inner);
        //     }
        //     array.push(inputArray[i]);
        //     console.log(array);
        // }
        // console.log(inner);
        return inner;
    }
}]);