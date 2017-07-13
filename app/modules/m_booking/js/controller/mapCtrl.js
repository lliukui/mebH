app.controller('mapCtrl', ['$scope', '$rootScope', '$stateParams', 'StorageConfig', function($scope, $rootScope, $stateParams, StorageConfig){
	$scope.showWap=false;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
	window.headerConfig={
		title: '诊所地图',
		otherRightOperate: {
            enable: true,
            html: '驾车',
            clickCall: function(){
            	$scope.showWap=!$scope.showWap;
            }
		}
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.ways=[
		{'text': '驾车', 'type': 0},
		{'text': '地铁', 'type': 1},
		{'text': '步行', 'type': 2},
	];

	$scope.checkWay=function(way){
		window.headerConfig.otherRightOperate.html=way.text;
        $scope.showWap=!$scope.showWap;
        document.getElementById('panel').innerHTML='';
        changeWap(way.type);
	}

	//初始化默认为驾车
    changeWap(0);

	function changeWap(type){
		//定位
	    var city = '上海';
	    var map, geolocation, geocoder, gotype;
	    //加载地图，调用浏览器定位服务
	    map = new AMap.Map('mapContainer', {
	        resizeEnable: false
	    });
	    map.plugin('AMap.Geolocation', function () {
	        geolocation = new AMap.Geolocation({
	            enableHighAccuracy: false, //是否使用高精度定位，默认:true
	            timeout: 10000, //超过10秒后停止定位，默认：无穷大
	            buttonOffset: new AMap.Pixel(5, 10), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	            buttonPosition: 'LT'
	        });
	        map.addControl(geolocation);
	        geolocation.getCurrentPosition();
	        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	        //AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
	    });
	    AMap.service('AMap.Geocoder', function () {//回调函数
	        //TODO: 使用geocoder 对象完成相关功能
	        geocoder = new AMap.Geocoder();
	    });

	    if (type === 1) {
	        AMap.service('AMap.Transfer', function () {//回调函数
	            //实例化Transfer
	            gotype = new AMap.Transfer({
	                map: map,
	                panel: "panel",
	                city: city
	            });
	            //TODO: 使用transfer对象调用公交换乘相关的功能
	        });
	    } else if (type === 2) {
	        AMap.service('AMap.Walking', function () {//回调函数
	            //实例化Walking
	            gotype = new AMap.Walking({
	                map: map,
	                panel: "panel"
	            });
	        });
	    } else {
	        //驾车导航
	        AMap.service(["AMap.Driving"], function () {
	            gotype = new AMap.Driving({
	                map: map,
	                panel: "panel"
	            });
	    	});
	    }
	    function onComplete(data) {
	        var lnglatXY = [data.position.getLng(), data.position.getLat()];//起点的坐标
	        //调用驾车导航系统
	        gotype.search(lnglatXY, [$stateParams.lng, $stateParams.lat]);
	    }
	}
}]);