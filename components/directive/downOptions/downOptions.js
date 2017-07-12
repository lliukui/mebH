app.directive('optionswidget', function(){
	var ctrl = ['$scope', '$rootScope', function($scope, $rootScope){
		var defaults = {
			text: '465',
			title: '',
			data: '',//数据
			unavailableData: '',//不可用数据
			selectedCallback: '',
			timestamp: Date.parse(new Date())
		}
		var _this = this;

		$scope.defaults = angular.extend(angular.copy(defaults), window.optionsConfig);

		$rootScope.$on('setOptionsConfig', function(event, data){
			var temp = angular.copy(defaults);
			$scope.defaults = angular.extend(temp, data);
		});

		var content = document.getElementsByClassName('content-page');
		//控制弹窗，显示，隐藏
		$scope.options = function(_key){
			$scope.showOptions = _key;
			content[0].style.overflow = 'hidden';
		}

		//关闭
		$scope.close = function(){
			$scope.showOptions = false;
			content[0].style.overflow = 'auto';
		}

		//点击选项框，阻止关闭事件
		$scope.stopClose = function($event){
			$event.stopPropagation();
		}

		//选择
		$scope.clickOnSelect = function(_data){
			if(_data.statu != 2){
				$scope.backOption = _data;
				$scope.showOptions = false;
				content[0].style.overflow = 'auto';
			}
		}

		$scope.$watch('backOption', function(n, o){
			if($scope.callback && typeof $scope.callback === 'function'){
				$scope.callback($scope.backOption);
			}
		})
	}];
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			key: '=optionsKey',
			text: '=optionsText',
			title: '=optionsTitle',
			data: '=optionsData',
			backOption: '=optionsBack',
			callback: '=optionsCallback'
		},
		controller: ctrl,
		templateUrl: 'template/options.html'
	}
});
app.run(['$templateCache', function($templateCache){
	$templateCache.put('template/options.html',
		'<div>\
			<p ng-click="options(key)">{{backOption ? backOption.value : text}}</p>\
			<div class="modal-mask" ng-show="showOptions == key" ng-click="close()">\
				<div class="options-content" ng-click="stopClose($event)">\
					<p class="title" ng-bind="title"></p>\
					<div class="option-list">\
						<div ng-show="data.length > 0">\
							<div class="item flex" ng-repeat="option in data" ng-click="clickOnSelect(option)">\
								<div class="left flex-1" ng-bind="option.value"></div>\
								<div class="right">{{option.statu == 1 ? "已选" : (option.statu == 2 ? "不可选" : "")}}</div>\
							</div>\
						</div>\
						<div ng-show="data.length == 0">\
							<div class="no-option">暂无选项</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>');
}])