app.controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'dialog', 'HomeService', 'StorageConfig', '$stateParams', function ($scope, $rootScope, $state, dialog, HomeService, StorageConfig, $stateParams) {
    //保存footer信息
    if($stateParams.footer){
        StorageConfig.FOOTER_STORAGE.putItem('showFooter', true);
    }

    $scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;
    
    window.headerConfig = {
        enableTitle: false,
        enableBack: false,
        enableRefresh: false,
        tabOperate:{
            enableTab: true,
            options: [],
            currentTab: '',
            selectedCall: selectedTab
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
                $scope.childId = child.childId;
                getChildgrowth();
            }
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
        if(item){
            $scope.childId=item.id;
            getChildgrowth();
        }
    }

    //用户提醒
    HomeService.readremind(urlOptions).then(function(res){
        // $scope.reminds=res.results.reminds;
        $scope.reminds=[
            '您在怡然童康儿童保健诊所有一个预约,请在2016-11-22 10:30之前到达!',
            '456',
        ]
    },function(res){
        dialog.alert(res.errorMsg);
    });

    $scope.goRouter = function(url){
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
        $state.go('layout.find-detail',{
            storyName: _url
        })
    }

    $scope.goHospital = function(_deptId){
        $state.go('layout.search-hospital',{
            deptId: _deptId
        })
    }

    $scope.showToast=function(){
        dialog.toast('敬请期待');
    }

    $scope.addGrowth=function(){
        $state.go('layout.home-addGrowth', {
            id: $scope.childId,
            source: 'home'
        })
    }

    $scope.growthdatas=function(){
        $state.go('layout.home-growthdatas', {
            id: $scope.childId
        })
    }

    $scope.legend = ['身高', '体重'];
    $scope.item = [];
    $scope.data = [];
    function getChildgrowth(){
        var urlChildgrowth={
            username: StorageConfig.TOKEN_STORAGE.getItem('username'),
            token: StorageConfig.TOKEN_STORAGE.getItem('token'),
            childId: $scope.childId
        };
        HomeService.childgrowth(urlChildgrowth).then(function(res){
            $scope.data = [res.results.growth.heights, res.results.growth.weights];
        },function(res){
            dialog.alert(res.errorMsg);
        });
    }
}]);