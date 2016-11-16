app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/layout/home');
        $urlRouterProvider.when('/layout', '/layout/home');
        $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'app/modules/m_test/view/index.html'
                })
                .state('layout', {
                    url: '/layout',
                    templateUrl: 'app/modules/m_layout/view/index.html'
                })
                .state('layout.home', {
                    url: '/home',
                    templateUrl: 'app/modules/m_home/view/index.html'
                })
                .state('layout.login', {
                    url: '/login',
                    templateUrl: 'app/modules/m_login/view/index.html'
                })
                .state('layout.booking-clinic', {
                    url: '/booking/clinic?id&cityId',
                    templateUrl: 'app/modules/m_booking/view/clinic.html'
                })
                .state('layout.booking-booking', {
                    url: '/booking/booking?type&clinicId&serviceId&time&date&doctorId',
                    templateUrl: 'app/modules/m_booking/view/booking.html'
                })
                .state('layout.orderlist',{
                    url: '/orderlist',
                    templateUrl: 'app/modules/m_order/view/index.html'
                })
                .state('layout.cck',{
                    url: '/cck',
                    templateUrl: 'app/modules/m_cck/view/index.html'
                })
                .state('layout.cck-ccktitles',{
                    url: '/cck/ccktitles',
                    templateUrl: 'app/modules/m_cck/view/ccktitles.html'
                })
                .state('layout.cck-cckinfo',{
                    url: '/cck/cckinfo/:id',
                    templateUrl: 'app/modules/m_cck/view/cckinfo.html'
                })
                .state('layout.cck-detail',{
                    url: '/cck/detail?contentUrl',
                    templateUrl: 'app/modules/m_cck/view/detail.html'
                })
                .state('layout.cck-searchcck',{
                    url: '/cck/searchcck',
                    templateUrl: 'app/modules/m_cck/view/searchcck.html'
                })
                .state('layout.cck-recipes',{
                    url: '/cck/recipes',
                    templateUrl: 'app/modules/m_cck/view/recipes.html'
                })
                .state('layout.cck-searchRecipes',{
                    url: '/cck/searchRecipes',
                    templateUrl: 'app/modules/m_cck/view/searchRecipes.html'
                })
                .state('layout.cck-food',{
                    url: '/cck/food',
                    templateUrl: 'app/modules/m_cck/view/food.html'
                })
                .state('layout.cck-foodtitles',{
                    url: '/cck/foodtitles?id',
                    templateUrl: 'app/modules/m_cck/view/foodtitles.html'
                })
                .state('layout.cck-searchfood',{
                    url: '/cck/searchfood',
                    templateUrl: 'app/modules/m_cck/view/searchfood.html'
                })
                .state('layout.cck-musictitles',{
                    url: '/cck/musictitles',
                    templateUrl: 'app/modules/m_cck/view/musictitles.html'
                })
                .state('layout.cck-musicinfo',{
                    url: '/cck/musicinfo?id',
                    templateUrl: 'app/modules/m_cck/view/musicinfo.html'
                })
                .state('layout.booking-selectClinic',{
                    url: '/booking/selectClinic',
                    templateUrl: 'app/modules/m_booking/view/selectClinic.html'
                })
                .state('layout.booking-selectDoctor',{
                    url: '/booking/selectDoctor?type&clinicId&serviceId',
                    templateUrl: 'app/modules/m_booking/view/selectDoctor.html'
                })
                .state('layout.user',{
                    url: '/user',
                    templateUrl: 'app/modules/m_user/view/index.html'
                })
                .state('layout.user-childlist',{
                    url: '/user/childlist',
                    templateUrl: 'app/modules/m_user/view/childlist.html'
                })
                .state('layout.user-createChild',{
                    url: '/user/createChild',
                    templateUrl: 'app/modules/m_user/view/createChild.html'
                })
                .state('layout.user-updateChild',{
                    url: '/user/updateChild?id',
                    templateUrl: 'app/modules/m_user/view/updateChild.html'
                })

    }]);