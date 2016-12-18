/**
 * Created by zhoupan on 2015/9/14.
 */
angular.module('login-controller', [])

.controller('LoginCtrl', ['$scope','locals', '$window', '$ionicPopup', '$timeout', '$state', 'loginService', function($scope,locals, $window, $ionicPopup, $timeout, $state, loginService) {
    $scope.formUser = { rememberMe: true };
    $scope.successPopup = {};
    $scope.goBack = function() {
        $window.history.go(-1);
    };
    //执行用户登录操作
    $scope.doLogin = function() {
        $scope.showSuccessMesPopup("正在登录请稍后");
        loginService.doLogin(this.formUser).success(function(data) {
            if (data == null) {
                $scope.showErrorMesPopup("网络故障");
            } else {
                // $scope.showSuccessMesPopup("正在登录请稍后");
                var resultCode = data.header.code;
                //登陆成功
                if (resultCode == '000') {
                    $scope.successPopup.close();
                      locals.set("isPersistLogined", 'true');
                    $state.go("tab.personal", {}, { reload: true });

                }
                //登陆失败
                else if (resultCode == 'E001') {
                    $scope.showErrorMesPopup("账号密码错误");
                }
                // sessionStorage.setItem("user", user);
            }
        }).error(function(data) {
            $scope.showErrorMesPopup("服务器出错");
        });
    };

    $scope.showErrorMesPopup = function(title) {
        var myPopup = $ionicPopup.show({
            title: '<b>' + title + '</b>'
        });
        $timeout(function() {
            myPopup.close(); // 2秒后关闭
        }, 1000);
    };

    $scope.showSuccessMesPopup = function(title) {
        var myPopup = $ionicPopup.show({
            title: '<b>' + title + '</b>',
            template: '<p style="text-align: center"><ion-spinner icon="android" class="spinner-positive"></ion-spinner></p>'
        });
        $scope.successPopup = myPopup;
        $timeout(function() {
            myPopup.close();
        }, 1000);
    };
}]);
