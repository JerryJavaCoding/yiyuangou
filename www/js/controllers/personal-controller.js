/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('personal-controller', [])
    .controller('PersonalCtrl', ['loginService', 'locals', 'personService', '$scope', '$ionicPopup', '$state', function(loginService, locals, personService, $scope, $ionicPopup, $state) {
        $scope.isPersistLogined = locals.get("isPersistLogined") || 'false';
        $scope.myInfo = locals.get("myInfo");

        console.log($scope.isPersistLogined);
        //自动获取个人资料
        if ($scope.isPersistLogined == 'true') {
            personService.home().success(function(data) {
                if (data.header.code == '000') {
                    $scope.myInfo = data.body.customerDetails;
                    $scope.isPersistLogined = 'true';
                    locals.setObject("myInfo", $scope.myInfo);
                    locals.set("isPersistLogined", 'true');

                } else {
                    $scope.isPersistLogined = 'false';
                    locals.setObject("myInfo", {});
                    locals.set("isPersistLogined", 'false');
                }
            });
        }
        $scope.login = function() {
            $state.go('login');
        };
        //退出登陆
        $scope.logout = function() {
            loginService.doLogout().success(function(data) {
                if (data.header.code == '000') {
                    $scope.myInfo = {};
                    $scope.isPersistLogined = 'false';
                    locals.setObject("myInfo", '');
                    locals.set("isPersistLogined", 'false');
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
    .controller('winRecordCtrl', ['$scope', '$state','$window','$timeout', '$ionicPopup', 'winprize', '$window', 'personService', function($scope, $state,$window,$timeout, $ionicPopup, winprize, $window, personService) {
        $scope.logisticsMes = {
            receiverName: '',
            receiverAddress: '',
            receiverCellPhone: ''
        }; //物流信息
        $scope.logisticsList = [{}];
        $scope.items = {};
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        personService.winHistory().success(function(data) {
            $scope.items = data.body.winPrizeList;

        });
        //领取奖品
        $scope.pickUp = function(winprizeId) {
               $ionicPopup.show({
                    templateUrl: 'templates/popupLogistics.html',
                    title: '收货地址',
                    scope: $scope,
                    buttons: [
                        { text: '取消' }, {
                            text: '<b>提交</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!$scope.logisticsMes) {
                                    e.preventDefault();
                                } else {
                                	//填写完物流信息并确认提交
                                    var reqParams = {
                                        "winprizeId": winprizeId,
                                        "receiverName": $scope.logisticsMes.receiverName,
                                        "receiverAddress": $scope.logisticsMes.receiverAddress,
                                        "receiverCellPhone": $scope.logisticsMes.receiverCellPhone
                                    };
                                    winprize.pickUp(reqParams).success(function(data) {
                                        console.log("提交成功");
                                        $window.location.reload();
                                    });
                                }
                            }
                        },
                    ]
                });                

            }
            //确认收货
        $scope.confirmRece = function(winprizeId) {
            winprize.receive(winprizeId).success(function(data) {
                // console.log("确认收货成功");
                $window.location.reload();
            });
        };

        function messageAlert(winprizeId) {

        }
        
    }])
    .controller('accountDetailCtrl', ['$scope', '$window', 'personService', function($scope, $window, personService) {
        $scope.balanceItems = {};
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        personService.accountDetail().success(function(data) {
            $scope.balanceItems = data.body.balanceHistoryList;
        });

    }])
