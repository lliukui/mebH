app.controller('baoquanCtrl', ['$scope', '$rootScope', 'dialog', 'StorageConfig', 'HomeService', 'baoquanService', '$state', function($scope, $rootScope, dialog, StorageConfig, HomeService, baoquanService, $state){
	$scope.header = true;
	$scope.footer = true;

	window.headerConfig = {
		title: '宝宝圈',
        enableTitle: false,
        enableBack: false,
        enableRefresh: false,
        tabOperate:{
            enableTab: true,
            options: [],
            currentTab: '',
        },
        otherRightOperate: {
        	enable: true,
        	html: '新增',
        	clickCall: function(){
        		$state.go('layout.baoquan-create', {
        			id: $scope.childId
        		})
        	}
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.hasData=false;
    // 获取宝宝信息
    var spinner=dialog.showSpinner();
    var urlOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token')
    };
    HomeService.getChilds(urlOptions).then(function(res){
        dialog.closeSpinner(spinner.id);
        if(res.results.childs.length>0){
            $scope.childs=res.results.childs;
            $scope.hasData=true;
            readyHeader($scope.childs);
        }else{
            dialog.confirm('您尚未创建宝宝，请立即创建',{
                closeCallback: function(value){
                    if(value==0){
                    }else{
                        $state.go('layout.user-createChild');
                    }
                }
            });
        }
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    // 宝宝信息于头部
    function readyHeader(childs){
        var childArray=new Array();
        angular.forEach($scope.childs, function(data,index,array){
            var child={name:data.childName,id:data.childId};
            childArray.push(child);
            if(data.isDefault==1){
                $scope.tabSelected=index;
                //成长信息，默认展示默认宝宝的信息
                $scope.childId = child.id;
                getBaoquan();
            }
        });
        window.headerConfig = {
			title: '宝宝圈',
            enableTitle: false,
            enableBack: false,
            enableRefresh: false,
            tabOperate:{
                enableTab: true,
                options: childArray,
                currentTab: $scope.tabSelected,
                selectedCall: selectedTab
            },
	        otherRightOperate: {
	        	enable: true,
	        	html: '新增',
	        	clickCall: function(){
	        		$state.go('layout.baoquan-create', {
	        			id: $scope.childId
	        		})
	        	}
	        }
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    }


    // 切换宝宝信息
    var selectedNum = true;
    function selectedTab(item, index){
    	if(selectedNum){
    		selectedNum = false;
    	}else{
	        $scope.tabSelected=index;
	        if(item){
	            $scope.childId=item.id;
	            getBaoquan();
	        }
    	}
    }

    function getBaoquan(){
    	var param = {
    		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
    		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
    		child_id: $scope.childId,
    	}
    	baoquanService.childcirclelist(param).then(function(res){
    		$scope.baoquanlist = res.results.childCircles;
    	}, function(res){
    		dialog.alert(res);
    	});
    }

    $scope.showImg = function(_url){
    	dialog.show('<img src="' + _url + '" class="w100">');
    }
}])