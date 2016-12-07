/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('cart-controller', [])
    .controller('CartCtrl', ['$scope', '$data', '$ionicPopup', '$ionicListDelegate', function($scope, $data, $ionicPopup, $ionicListDelegate) {
        var leftQuantity = 10; //剩余人次
        $scope.quantity = 0; //购买的数量
        $scope.buyUnit = 1;
        $scope.items = [
            { id: 0 ,img:'/img/mac.jpg'},
            { id: 1 },

        ];
       
        $scope.quantityPlus = function() {
            if ($scope.quantity < leftQuantity)
                $scope.quantity++;
        }
        $scope.quantityMinus = function() {
            if ($scope.quantity > 0)
                $scope.quantity--;
        }
        $scope.delCart = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '删除',
                template: '确认删除购物项?',
                cancelText: '取消',
                okText: '删除'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.items.splice(0, 1);
                    console.log($scope.items);
                    console.log('删除成功！');
                    
                } else {
                    console.log('取消删除！');
                }
            });
        }
        


    }])
