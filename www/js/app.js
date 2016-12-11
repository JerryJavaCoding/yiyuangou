 angular.module('lqApp', ['ionic', 'lqApp.controllers', 'lqApp.services', 'lqApp.directives', 'lqApp.filters'])

 .run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
         // for form inputs)
         if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             cordova.plugins.Keyboard.disableScroll(true);

         }
         if (window.StatusBar) {
             // org.apache.cordova.statusbar required
             StatusBar.styleLightContent();
         }
     });
 })

 .config(function($stateProvider, $httpProvider, $urlRouterProvider, $ionicConfigProvider) {
     $httpProvider.defaults.withCredentials = true;
     //使用$ionicConfigProvider服务解决ionic项目生成的导航栏在手机顶部的问题
     $ionicConfigProvider.platform.ios.tabs.style('standard');
     $ionicConfigProvider.platform.ios.tabs.position('bottom');
     $ionicConfigProvider.platform.android.tabs.style('standard');
     $ionicConfigProvider.platform.android.tabs.position('standard');

     $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
     $ionicConfigProvider.platform.android.navBar.alignTitle('left');

     // 使用$stateProvider中的state()方法来进行路由的配置，这是ionic种的路由实现机制
     // 此处，没有使用AngularJS中的路由机制

     // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('tab/main');

     $stateProvider
     // setup an abstract state for the tabs directive
         .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
     })

     //登录
     .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller: 'LoginCtrl'
     })

     //注册
     .state('register', {
         url: '/register',
         templateUrl: 'templates/register.html',
         controller: 'RegisterCtrl'
     })

     //修改密码
     .state('modifyPassword', {
         url: '/modifyPassword',
         templateUrl: 'templates/modifyPassword.html',
         controller: 'ModifyPasswordCtrl'
     })

     //首页模块
     .state('tab.main', {
         url: '/main',
         views: {
             'tab-main': {
                 templateUrl: 'templates/tab-main.html',
                 controller: 'MainCtrl'
             }
         }

     })

     //首页-详情模块
     .state('tab.main-detail', {
         url: '/main/:id',
         views: {
             'tab-main': {
                 templateUrl: 'templates/main-detail.html',
                 controller: 'MainDetailCtrl'
             }
         }

     })





     //所有商品模块
     .state('tab.allproduct', {
         url: '/allproduct',
         views: {
             'tab-allproduct': {
                 templateUrl: 'templates/tab-allproduct.html',
                 controller: 'allproductCtrl'
             }
         }

     })


     //最新揭晓模块
     .state('tab.lastannounce', {
         url: '/lastannounce',
         views: {
             'tab-lastAnnounce': {
                 templateUrl: 'templates/tab-lastAnnounce.html',
                 controller: 'lastAnounceCtrl'
             }
         }

     })


     //购物车模块
     .state('tab.cart', {
         url: '/cart',
         cache:'false',
         views: {
             'tab-cart': {

                 templateUrl: 'templates/tab-cart.html',
                 controller: 'CartCtrl'
             }
         }

     })

     //我模块
     .state('tab.personal', {
             url: '/personal',
             cache: 'false',
             views: {
                 'tab-personal': {
                     templateUrl: 'templates/tab-personal.html',
                     controller: 'PersonalCtrl'
                 }
             }

         }).state('purchaseRecord', {
             url: '/purchaseRecord',
             templateUrl: 'templates/purchaseRecord.html',
             controller: 'purchaseCtrl'

         })
         .state('winRecord', {
             url: '/winRecord',
             templateUrl: 'templates/winRecord.html',
             controller: 'winRecordCtrl'
         })
         .state("accountDetail", {
             url: '/accountDetail',
             templateUrl: "templates/account-detail.html",
             controller: 'accountDetailCtrl'
         })

 });
