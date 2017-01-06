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
     //أٹآ¹أ“أƒ$ionicConfigProviderآ·أ¾أژأ±آ½أ¢آ¾أ¶ionicأڈأ®أ„آ؟أ‰أ؛آ³أ‰آµأ„آµآ¼آ؛آ½أ€آ¸أ”أڑأٹأ–آ»أ؛آ¶آ¥آ²آ؟آµأ„أژأٹأŒأ¢
     $ionicConfigProvider.platform.ios.tabs.style('standard');
     $ionicConfigProvider.platform.ios.tabs.position('bottom');
     $ionicConfigProvider.platform.android.tabs.style('standard');
     $ionicConfigProvider.platform.android.tabs.position('standard');

     $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
     $ionicConfigProvider.platform.android.navBar.alignTitle('left');

     // أٹآ¹أ“أƒ$stateProviderأ–أگآµأ„state()آ·آ½آ·آ¨أ€آ´آ½أ¸أگأگأ‚آ·أ“أ‰آµأ„أ…أ¤أ–أƒآ£آ¬أ•أ¢أٹأ‡ionicأ–أ–آµأ„أ‚آ·أ“أ‰أٹآµأڈأ–آ»أ؛أ–أ†
     // آ´أ‹آ´آ¦آ£آ¬أƒآ»أ“أگأٹآ¹أ“أƒAngularJSأ–أگآµأ„أ‚آ·أ“أ‰آ»أ؛أ–أ†

     // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('tab/main');

     $stateProvider
     // setup an abstract state for the tabs directive
         .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
     })

     //آµأ‡أ‚آ¼
     .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller: 'LoginCtrl'
     })

     //أ—آ¢آ²أ،
     .state('register', {
         url: '/register',
         templateUrl: 'templates/register.html',
         controller: 'RegisterCtrl'
     })

     //أگأ‍آ¸أ„أƒأœأ‚أ«
     .state('modifyPassword', {
             url: '/modifyPassword',
             templateUrl: 'templates/modifyPassword.html',
             controller: 'ModifyPasswordCtrl'
         })
     //أ‰أŒأ†آ·أڈأھأ‡أ©
         .state('prodDetail', {
             url: '/prodDetail/{drawcycleId}',
              cache: 'false',
             templateUrl: 'templates/product-detail.html',
             controller: 'ProductDetailCtrl'
         })
         //أٹأ—أ’آ³أ„آ£آ؟أ©
         .state('tab.main', {
             url: '/main',
             views: {
                 'tab-main': {
                     templateUrl: 'templates/tab-main.html',
                     controller: 'MainCtrl'
                 }
             }

         })

     //أٹأ—أ’آ³-أڈأھأ‡أ©أ„آ£آ؟أ©
     .state('tab.main-detail', {
         url: '/main/:id',
         views: {
             'tab-main': {
                 templateUrl: 'templates/main-detail.html',
                 controller: 'MainDetailCtrl'
             }
         }

     })





     //أ‹أ¹أ“أگأ‰أŒأ†آ·أ„آ£آ؟أ©
     .state('tab.allproduct', {
         url: '/allproduct',
         views: {
             'tab-allproduct': {
                 templateUrl: 'templates/tab-allproduct.html',
                 controller: 'allproductCtrl'
             }
         }

     })


     //أ—أ®أگأ‚آ½أ’أڈأ¾أ„آ£آ؟أ©
     .state('tab.lastannounce', {
         url: '/lastannounce',
         cache: 'false',
         views: {
             'tab-lastAnnounce': {
                 templateUrl: 'templates/tab-lastAnnounce.html',
                 controller: 'lastAnounceCtrl'
             }
         }

     })


     //آ¹آ؛أژأ¯آ³آµأ„آ£آ؟أ©
     .state('tab.cart', {
         url: '/cart',
         cache: 'false',
         views: {
             'tab-cart': {

                 templateUrl: 'templates/tab-cart.html',
                 controller: 'CartCtrl'
             }
         }

     })

     //أژأ’أ„آ£آ؟أ©
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
             cache:false,
             templateUrl: 'templates/purchaseRecord.html',
             controller: 'purchaseCtrl'

         })
         .state('winRecord', {
             url: '/winRecord',
             templateUrl: 'templates/winRecord.html',
             cache:false,
             controller: 'winRecordCtrl'
         })
         .state("accountDetail", {
             url: '/accountDetail',
             templateUrl: "templates/account-detail.html",
             controller: 'accountDetailCtrl'
         })
         .state("toShow",{
            url:"/toShow/:winId",
            templateUrl:"templates/to-show.html",
            controller:'toShowCtrl'
         })
         .state("myShow",{
            url:"/myshow",
            cache:false,
            templateUrl:"templates/showRecord.html",
            controller:'myShowCtrl'
         })

 });
