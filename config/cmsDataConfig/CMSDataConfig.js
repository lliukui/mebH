app.factory('CMSDataConfig', ['StorageConfig', '$state', function (StorageConfig, $state) {
    var data = {};
    data.appMenus = [
        {
            text: '首页',
            class: 'icon-home',
            route: 'layout.home',
            url: '/layout/home'
        },
        {
            text: '宝圈',
            class: 'icon-baoquan',
            route: 'layout.baoquan',
            url: '/layout/baoquan'
        },
        {
            text: '育儿',
            class: 'icon-cck',
            route: 'layout.cck',
            url: '/layout/cck'
        },
        {
            text: '我的',
            class: 'icon-me',
            route: 'layout.user',
            url: '/layout/user'
        }
    ];
    return data;
}]);