app.factory('StorageConfig', ['ngStorage', function (ngStorage) {
    //定义了common的localStorage，可以放入app公用的一些数据。注意：此数据会不会因为浏览器关闭而删除，不得放入敏感数据
    var common_storage = ngStorage.localStorage('meb_common_storage');
    //存储选中诊所信息
    var booking_storage = ngStorage.sessionStorage('meb_clinic');
    //存储选中服务
    var service_storage = ngStorage.sessionStorage('meb_service');
    //编辑宝宝信息
    var child_storage = ngStorage.sessionStorage('meb_child');
    //默认token的sessionStorage，用来存放当前的token。用户关闭浏览器后即删除
    var session_token = ngStorage.localStorage('meb_session_token');
    //用于存储登录拦截的参数
    var intercept_storage = ngStorage.sessionStorage('meb_intercept');
    //用于存储是否显示footer
    var footer_storage = ngStorage.sessionStorage('meb_footer');
    //用于存储订单详情
    var order_storage = ngStorage.sessionStorage('meb_order');
    //用于存储需要修改的成长数据
    var growth_storage = ngStorage.sessionStorage('meb_growth');
    return {
        COMMON_STORAGE: common_storage,
        BOOKING_STORAGE: booking_storage,
        SERVICE_STORAGE: service_storage,
        CHILD_STORAGE: child_storage,
        TOKEN_STORAGE: session_token,
        INTERCEPT_STORAGE: intercept_storage,
        FOOTER_STORAGE: footer_storage,
        ORDER_STORAGE: order_storage,
        GROWTH_STORAGE: growth_storage,
    };
}]);