app.controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'dialog', 'HomeService',function ($scope, $rootScope, $state, dialog,HomeService) {

    window.headerConfig = {
        enableTitle: false,
        enableBack: false,
        enableRefresh: false,
        tabOperate:{
            enableTab: true,
            options: [],
            currentTab: $scope.tabSelected,
            selectedCall: selectedTab
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    // 获取宝宝信息
    var spinner=dialog.showSpinner();
    var urlOptions={
        username: '15212789819',
        token: '6859CACBA01AAA721E65FD83F0AE19A2'
    };
    HomeService.getChilds(urlOptions).then(function(res){
        dialog.closeSpinner(spinner.id);
        $scope.childs=res.results.childs;
        readyHeader($scope.childs);
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    // 宝宝信息于头部
    function readyHeader(childs){
        $scope.tabSelected=0;
        var childArray=new Array();
        angular.forEach($scope.childs, function(data,index,array){
            var child={name:data.childName,id:data.childId};
            childArray.push(child);
        });
        window.headerConfig = {
            enableTitle: false,
            enableBack: false,
            enableRefresh: false,
            tabOperate:{
                enableTab: true,
                options: childArray,
                currentTab: $scope.tabSelected,
                selectedCall: selectedTab
            }
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    }


    // 切换宝宝信息
    function selectedTab(item, index){
        $scope.tabSelected=index;
    }

    $scope.routerGo = function(url){
    	$state.go(url);
    }

    
    $scope.callPhone = function(){
        var _confirm = dialog.confirm('立即拨打免费客服热线400-6277-120',{
            title: '友情提示',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                   location.href = 'tel://4006277120';
                }
            }
        });   
    }
    
    

    $scope.goDetailUrl = function(_url){
        console.log('_url',_url);
        $state.go('layout.find-detail',{
            storyName: _url
        })
    }

    $scope.goHospital = function(_deptId){
        console.log('_deptId',_deptId);
        $state.go('layout.search-hospital',{
            deptId: _deptId
        })
    }

}]);