app.controller('IndexCtrl', ['$scope', function ($scope) {

	$scope.legend = ["Berlin", "London",'New York','Tokyo'];  
    $scope.item = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
    $scope.data = [  
        [-1, 1, 3, 7, 13, 16, 18, 16, 15, 9, 4, 2],
        [0, 1, 4, 7, 12, 15, 16, 15, 15, 10, 6, 5],
        [4, 4, 5, 10, 16, 22, 25, 24, 20, 14, 9, 3],
        [7, 6, 8, 14, 17, '', 22, 25]
    ];  
}]);