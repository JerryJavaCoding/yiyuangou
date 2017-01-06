/**
 * Created by zhoupan on 2015/9/14.
 */
angular.module('register-controller', [])

.controller('RegisterCtrl', ['$scope', '$ionicPopup', '$ionicModal', 'register', '$timeout', '$state', '$window', function($scope, $ionicPopup, $ionicModal, register, $timeout, $state, $window) {
    $scope.formUser = {};
    $scope.modal = '';
    $scope.customerCode = '';
    $scope.goBack = function() {
        $window.history.go(-1);
    }
    $ionicModal.fromTemplateUrl('phone_validate.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;

    });
    //注册前验证用户名和密码，包括发送验证码
    $scope.doRegister = function() {
        // console.log($scope.formUser);

        register.validate($scope.formUser).success(function(data) {

            if (data.header.code == '000') {
                $scope.showSuccessMesPopup("正在验证，请稍后");
                $timeout(function() {
                    $scope.openModal();
                }, 2000);
            } else {

                $scope.showErrorMesPopup("用户名已被注册，请更换！");

            }
        });
    };

    //验证码校验
    $scope.registe = function() {

        register.registe($scope.formUser.customerCode).success(function(data) {
            if (data.header.code == '000') {
                $scope.showSuccessMesPopup("正在验证，请稍后");
                $timeout(function() {
                    $scope.showErrorMesPopup("注册成功！");

                }, 2000);
            } else
                $scope.showErrorMesPopup("验证码不对");
            $state.go("tab.personal", {}, { reload: true });
        })
    }


    $scope.showErrorMesPopup = function(title) {
        var myPopup = $ionicPopup.show({
            title: '<b>' + title + '</b>'
        });
        $timeout(function() {
            myPopup.close(); // 2秒后关闭
        }, 1000);
    };

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function() {
        // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function() {
        // 执行动作
    });

    //  验证成功后提示框
    $scope.showSuccessMesPopup = function(title) {
        var myPopup = $ionicPopup.show({
            title: '<b>' + title + '</b>',
            template: '<p style="text-align: center"><ion-spinner icon="android"></ion-spinner></p>'
        });
        $timeout(function() {
            myPopup.close(); // 2秒后关闭
        }, 2000);
    };


}]);
