app.controller('cckCtrl',['$scope','$rootScope','$state',function($scope,$rootScope,$state){
	window.headerConfig={
		enableBack: false,
		title: '育儿宝库',
		enableRefresh: false,
	};
	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.routerGo=function(url){
		$state.go(url);
	}
}]);