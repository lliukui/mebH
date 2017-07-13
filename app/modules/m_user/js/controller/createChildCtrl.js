app.controller('createChildCtrl',['$scope','$rootScope','tokenService','dialog','childService','$state','StorageConfig',function($scope,$rootScope,tokenService,dialog,childService,$state,StorageConfig){
	$scope.header = true;
    $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    
    window.headerConfig={
		enableBack: true,
		title: '添加监护儿童'
	}
	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

    //选择性别
    $scope.selectGender=function(_gender){
        $scope.gender=_gender;

    }

    $scope.dateText = '请选择出生年月';
    $scope.birth_date = '';
    window.calendarConfig={
        end_date: new Date(),
        selectedCallback: function(backDate){
            if(backDate){
                $scope.birth_date=backDate.date;
            }
        }
    }
    $rootScope.$broadcast('setCalendarConfig', window.calendarConfig);

    //初始化星座
    $scope.horoscope = '';
    $scope.optionsHoroscope = {
        text: '选择星座',
        title: '星座列表',
        data: [
            {key: 'aries', value: '白羊座'},
            {key: 'taurus', value: '金牛座'},
            {key: 'gemini', value: '双子座'},
            {key: 'cancer', value: '巨蟹座'},
            {key: 'leo', value: '狮子座'},
            {key: 'virgo', value: '处女座'},
            {key: 'libra', value: '天秤座'},
            {key: 'scorpio', value: '天蝎座'},
            {key: 'sagittarius', value: '射手座'},
            {key: 'capricorn', value: '摩羯座'},
            {key: 'aquarius', value: '水瓶座'},
            {key: 'pisces', value: '双鱼座'},
        ],
        backData: '',
        callback: function(_data){
            if(_data){
                $scope.horoscope = _data.key;
            }
        }
    };

    //初始化生肖
    $scope.shengxiao = '';
    $scope.optionsShengxiao = {
        text: '选择生肖',
        title: '生肖列表',
        data: [
            {key: 'rat', value: '鼠'},
            {key: 'ox', value: '牛'},
            {key: 'tiger', value: '虎'},
            {key: 'hare', value: '兔'},
            {key: 'dragon', value: '龙'},
            {key: 'snake', value: '蛇'},
            {key: 'horse', value: '马'},
            {key: 'sheep', value: '羊'},
            {key: 'monkey', value: '猴'},
            {key: 'cock', value: '鸡'},
            {key: 'dog', value: '狗'},
            {key: 'boar', value: '猪'},
        ],
        backData: '',
        callback: function(_data){
            if(_data){
                $scope.shengxiao = _data.key;
            }
        }
    };

    //初始化血型
    $scope.blood_type = '';
    $scope.optionsBloodtype = {
        text: '选择血型',
        title: '血型列表',
        data: [
            {key: 'A', value: 'A型'},
            {key: 'B', value: 'B型'},
            {key: 'O', value: 'O型'},
            {key: 'AB', value: 'AB型'},
        ],
        backData: '',
        callback: function(_data){
            if(_data){
                $scope.blood_type = _data.key;
            }
        }
    };

    var apiUrl=window.envs.api_url;
    var spinner=dialog.showSpinner();
    tokenService.getToken().then(function(res){
        dialog.closeSpinner(spinner.id);
        readyUpload(res.uptoken);
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    function readyUpload(_token){
        UploadImg.init({
            id: 'uploadImgBox',
            multiple: false, // enable the component can select multiple files in one time. In mobile, please use the false.
            maxCount: 1, // the max number picture could upload.
            // autoUpload: false,
            //required: false, //ctrl you must upload images files or not. if false, the UploadImg.isFinished() init is true.
            // imgListArray: [],
            fileNum: getFileNum,
            upload: {
                uploadUrl: 'http://upload.qiniu.com/',
                token: _token,
                tokenUrl: apiUrl+'/mebapi/childtoken',
                type: 'POST',
                async: true,
                nameSpace: '',
                submitBtnId: 'create',
                beforeCall: beforeCall,
                afterCall: afterCall,
                params: {},
                btnHtml: '',
            }
        });

        function getFileNum(num){
            console.log(num);
        }

        var spinner='';

        function beforeCall(doingCall){
            spinner=dialog.showSpinner();
            doingCall({});
        }

        function afterCall(upFileList){
            var requestObj={
                username: StorageConfig.TOKEN_STORAGE.getItem('username'),
                token: StorageConfig.TOKEN_STORAGE.getItem('token'),
                name: $scope.name,
                nickname: $scope.nickname,
                gender: $scope.gender,
                birth_date: $scope.birth_date,
                blood_type: $scope.blood_type,
                horoscope: $scope.horoscope,
                shengxiao: $scope.shengxiao,
                is_default: '1',
                remote_domain: 'http://og03472zu.bkt.clouddn.com',
                remote_file_key: upFileList[0].key
            }
            childService.createChild(requestObj).then(function(res){
                dialog.closeSpinner(spinner.id);
                $state.go('layout.home-addGrowth', {
                    id: res.results.id,
                    source: 'createChild'
                });
            },function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            });
        }
    }
}]);