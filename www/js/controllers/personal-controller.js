/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('personal-controller', [])
    .controller('PersonalCtrl', ['loginService', 'locals', 'personService', '$scope', '$ionicPopup', '$state', function(loginService, locals, personService, $scope, $ionicPopup, $state) {
        $scope.isPersistLogined = locals.get("isPersistLogined");
        $scope.myInfo = {};


        //自动获取个人资料
        personService.home().success(function(data) {
            if (data.header.code == '000') {
                $scope.myInfo = data.body.customerDetails;
                $scope.isPersistLogined = true;
                locals.setObject("myInfo", $scope.myInfo);
                locals.set("isPersistLogined", true);
            }
        });
        $scope.login = function() {
            $state.go('login');
        };
        //退出登陆
        $scope.logout = function() {
            loginService.doLogout().success(function(data) {
                if (data.header.code == '000') {
                    $scope.myInfo = {};
                    $scope.isPersistLogined = false;
                    locals.setObject("myInfo", '');
                    locals.set("isPersistLogined", false);
                }
            });
        }
        $scope.isOne = false;
        $scope.isTwo = false;
        $scope.show = function(subModalIndex) {
            if (subModalIndex == 1) { //我的登记
                $scope.isOne = true;
                $scope.isTwo = false;
            } else { //我的信息
                $scope.isOne = false;
                $scope.isTwo = true;

                //获取当前session中的user(即当前登录的用户)
                $scope.user = JSON.parse(sessionStorage.getItem("user"));

            }
            $scope.tab = subModalIndex;
        };

        $scope.show(1);


        // // 确认弹出框
        // $scope.showConfirm = function() {
        //     $ionicPopup.confirm({
        //             title: "确认退出当前登录？",
        //             okText: "确认",
        //             cancelText: "取消"
        //         })
        //         .then(function(res) {
        //             if (res) {
        //                 $state.go('login');
        //             } else {
        //                 return false;
        //             }
        //         });
        // };

    }])
    //购买记录
    .controller('purchaseCtrl', ['$scope', '$window', 'personService', function($scope, $window, personService) {
        $scope.myTitle = '购买记录';
        $scope.items = {};
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        personService.purchaseHistory().success(function(data) {
            $scope.items = data.body.purchaseDetailsList;

        });
    }])
    .controller('winRecordCtrl', ['$scope', '$window', 'personService', function($scope, $window, personService) {
       
        $scope.items = {};
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        personService.winHistory().success(function(data) {
            $scope.items = data.body.winPrizeList;

        });
    }])
    .controller('accountDetailCtrl', ['$scope','$window','personService' ,function($scope,$window,personService){
        $scope.balanceItems={};
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        personService.accountDetail().success(function(data){
           $scope.balanceItems= data.body.balanceHistoryList;
        });

    }])
