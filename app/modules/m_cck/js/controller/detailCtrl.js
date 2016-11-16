app.controller('detailCtrl',['$scope','$rootScope','$stateParams','cckDetailService','$sce',function($scope,$rootScope,$stateParams,cckDetailService,$sce){
	window.headerConfig={
		enableBack: true,
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.contentUrl=$sce.trustAsResourceUrl($stateParams.contentUrl);

	// var urlOptions={
	// 	contentUrl: $stateParams.contentUrl
	// }
	// cckDetailService.getContentByUrl(urlOptions).then(function(res){

	// },function(res){

	// });
}]);