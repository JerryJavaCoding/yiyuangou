/**
 * Created by zhoupan on 2015/9/14.
 */
angular.module('modifyPassword-controller', [])

.controller('ModifyPasswordCtrl', ['$scope', '$ionicPopup', '$timeout', '$state', 'register', '$window', function($scope, $ionicPopup, $timeout, $state, register, $window) {
    $scope.formUser = {};
    $scope.goBack = function() {
            $window.history.go(-1);
        }
        //执行用户登录操作
    $scope.doModify = function() {


        register.modifyPassword($scope.formUser.originalPwd, $scope.formUser.newPwd).success(function(data) {
            if (data.header.code == '000') {
                $scope.showSuccessMesPopup("正在修改请稍后");
                $state.go("tab.personal", {}, { reload: true });

            } else {
                $scope.showErrorMesPopup("旧密码错误");
            }
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
        $timeout(function() {
            myPopup.close(); // 2秒后关闭
            $state.go("tab.main");
        }, 2000);
    };
}]);
