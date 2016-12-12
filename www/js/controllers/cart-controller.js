/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('cart-controller', [])
    .controller('CartCtrl', ['$scope', '$data', 'locals', '$ionicPopup', '$ionicListDelegate', function($scope, $data, locals, $ionicPopup, $ionicListDelegate) {
        var leftQuantity = 10; //剩余人次
        $scope.quantity = 0; //购买的数量
        $scope.totPri = 0;
        $scope.cartItems = locals.getArray("cartItems");
        
        for (i = 0; i < $scope.cartItems.length; i++) {
            $scope.totPri += $scope.cartItems[i].myBuyCnt * $scope.cartItems[i].buyUnit;
        }
        $scope.quantityPlus = function(drawcycle) {
            var myBuyCnt = drawcycle.myBuyCnt;
            if (myBuyCnt < drawcycle.leftCnt) {
                drawcycle.myBuyCnt++;
                updateTotPrice();
                updateLocalStorage(drawcycle);
            }
        };
        // 更新本地购物车存储
        function updateLocalStorage(drawcycle) {
            var cartItems = locals.getArray("cartItems");
            removeByValue(cartItems, drawcycle);
            cartItems.push(drawcycle);
            locals.setObject('cartItems', cartItems);
        }
        // -
        $scope.quantityMinus = function(drawcycle) {
            var myBuyCnt = drawcycle.myBuyCnt;
            if (myBuyCnt > 0) {
                drawcycle.myBuyCnt--;
                updateTotPrice();
                updateLocalStorage(drawcycle);
            }
        };
        $scope.inputBuyCnt = function(drawcycle) {

            var buyCnt = drawcycle.myBuyCnt;
            debugger;
            if (drawcycle.leftCnt < buyCnt)
                drawcycle.myBuyCnt = drawcycle.leftCnt;
            updateTotPrice();
            updateLocalStorage(drawcycle);

        };
        //更新购物车中所有物品的总价
        function updateTotPrice() {
            $scope.totPri = 0;
            for (i = 0; i < $scope.cartItems.length; i++) {
                $scope.totPri += $scope.cartItems[i].buyUnit * $scope.cartItems[i].myBuyCnt;
            }

        };
        //删除购物商品项
        $scope.delCart = function(drawcycle) {
            var confirmPopup = $ionicPopup.confirm({
                title: '删除',
                template: '确认删除购物项?',
                cancelText: '取消',
                okText: '删除'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    var cartItems = locals.getArray("cartItems");
                    removeByValue($scope.cartItems, drawcycle);
                    locals.setObject('cartItems', $scope.cartItems);
                    $scope.totPri -= drawcycle.buyUnit * drawcycle.myBuyCnt;
                    console.log('删除成功！');
                } else {
                    console.log('取消删除！');
                }
            });
        }

        function removeByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].drawCycleID == val.drawCycleID) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

    }])
