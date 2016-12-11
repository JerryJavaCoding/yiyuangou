/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('allproduct-controller', [])
    .controller('allproductCtrl', ['$scope', 'locals', '$ionicActionSheet', 'drawcycleService', '$ionicModal', '$timeout', '$data', function($scope, locals, $ionicActionSheet, drawcycleService, $ionicModal, $timeout, $data) {
        $scope.selectedCat = { label: "全部商品", 'value': '1' };
        $scope.products = [];
        $scope.categoryList = [];
        $scope.searchBy = 'progress';
        var requestParams = {
            categoryId: 1,
            searchBy: 'all',
            page: 0,
            pageSize: 3,
            viewMode: 'NORMAL'
        };


        $scope.changeCat = function(catId) {
            requestParams.categoryId = catId;
            requestParams.page = 1;
            refresh();
        };
        $scope.changeSearchBy = function(searchBy) {
                requestParams.searchBy = searchBy;
                requestParams.page = 1;
                refresh();
            }
            //自动获取商品种类
        drawcycleService.getCategoryList().success(function(data) {
            $scope.categoryList = data.body.categoryDetailsList;

        });
        //因为上拉加载更多先要判断，所以要在原来基础上加1
        var totalPage = 2;
        //初始化和刷新商品数据的方法
        function refresh() {
            console.log(requestParams.page);
            return drawcycleService.gethotItems(requestParams).success(function(data) {
                $scope.products = data.body.drawCycleDetailsList;
                totalPage = data.body.totalPage;

            });
        };
        //下拉刷新
        $scope.doRefresh = function() {
            requestParams.page = 1;
            refresh().finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            });
            // requestParams.page++;

        };

        $scope.loadMore = function() {
            requestParams.page++;
            drawcycleService.gethotItems(requestParams).success(function(data) {
                //注意这里要合并两个数组
                $scope.products = $scope.products.concat(data.body.drawCycleDetailsList);
                totalPage = data.body.totalPage;

            });

            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        //允许上拉加载的判断条件
        $scope.moreDataCanBeLoaded = function() {

            if ((requestParams.page + 1) > totalPage)
                return false;
            else
                return true;
        };
        //添加到购物车，存到本地变量
        $scope.addToCart = function(drawCycle) {
            var cartItems = locals.getArray("cartItems");
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].drawCycleID == drawCycle.drawCycleID) {
                    alert("已添加到购物车");
                    return;
                }
            }
            cartItems.push(drawCycle);
            locals.setObject("cartItems", cartItems);        
        };

        // $scope.$on('stateChangeSuccess', function() {
        //     $scope.loadMore();
        // });
        // $scope.items4LQLZ = [];
        // $scope.items4LQDY = [];
        // $scope.psagination = {
        //     pageSize: 10,
        //     currentPage: 1
        // };

        // $scope.pagination1 = {
        //     pageSize: 10,
        //     currentPage: 1
        // };
        // $scope.tabIndex = '林权流转登记';

        // $scope.isOne = false;
        // $scope.isTwo = false;

        // $scope.showTab = function(tabIndex) {
        //     if (tabIndex == '林权流转登记') {
        //         $scope.isOne = true;
        //         $scope.isTwo = false;
        //     } else {
        //         $scope.isHaveMoreData = true;
        //         $scope.isOne = false;
        //         $scope.isTwo = true;
        //     }
        //     $scope.tabIndex = tabIndex;
        // };

        // $scope.showTab($scope.tabIndex);


        // $scope.isHaveMoreData = true;

        // //加载更多林权流转
        // $scope.loadMoreLQLZ = function() {
        //     console.log($scope.isHaveMoreData);
        //     $data.findAll("xxcx", { pageSize: $scope.pagination.pageSize, currentPage: $scope.pagination.currentPage++, cxlx: '林权流转登记' })
        //         .success(function(data) {
        //             if (data == null) {
        //                 $scope.isHaveMoreData = false;
        //                 return;
        //             }

        //             $scope.items4LQLZ = $scope.items4LQLZ.concat(data);

        //         })
        //         .finally(function() {
        //             $timeout(function() {
        //                 $scope.$broadcast("scroll.infiniteScrollComplete");
        //             }, 2000);
        //         });
        // };

        // //加载更多林权抵押
        // $scope.loadMoreLQDY = function() {
        //     $data.findAll("xxcx", { pageSize: $scope.pagination1.pageSize, currentPage: $scope.pagination1.currentPage++, cxlx: '林权抵押登记' })
        //         .success(function(data) {
        //             if (data == null) {
        //                 $scope.isHaveMoreData = false;
        //                 return;
        //             }

        //             $scope.items4LQDY = $scope.items4LQDY.concat(data);

        //         })
        //         .finally(function() {
        //             $timeout(function() {
        //                 $scope.$broadcast("scroll.infiniteScrollComplete");
        //             }, 2000);
        //         });
        // };



        // $scope.$on("stateChangeSuccess", function() {
        //     $scope.loadMoreLQLZ();
        //     $scope.loadMoreLQDY();

        // });


        // $ionicModal.fromTemplateUrl("templates/search-modal-xxcx.html", {
        //     scope: $scope,
        //     animation: "slide-in-up"
        // }).then(function(modal) {
        //     $scope.modal = modal;
        // });


        // $scope.openModal = function() {
        //     $scope.modal.show();
        // };
        // $scope.closeModal = function() {
        //     $scope.modal.hide();
        // };

        // $scope.removeModal = function() {
        //     $scope.modal.remove();
        // };
        // //Cleanup the modal when we are done with it!
        // $scope.$on("$destroy", function() {
        //     console.log('modal.$destroy');
        //     $scope.modal.remove();
        // });
        // // Execute action on hide modal
        // $scope.$on("modal.hidden", function() {
        //     // Execute action
        //     console.log('modal.hidden');
        // });
        // // Execute action on remove modal
        // $scope.$on("modal.removed", function() {
        //     // Execute action
        //     console.log('modal.removed');
        // });

        // //多条件查询供求信息
        // $scope.queryConditions = { releaseTime: "", publisher: "", type: "" };
        // $scope.findByConditions = function() {
        //     $data.findByConditions("gqpt", $scope.queryConditions)
        //         .success(function(data) {
        //             $scope.items = data;
        //         })
        //         .finally(function(data) {
        //             $timeout(function() {
        //                 $scope.$broadcast("scroll.infiniteScrollComplete");
        //             }, 2000);
        //         });
        // };

    }])

.controller('XxcxDetailCtrl', ['$scope', '$stateParams', '$data', function($scope, $stateParams, $data) {
    $data.findById("xxcx", $stateParams.id)
        .success(function(data) {
            console.log(data);
            $scope.detailData = data;
        })
        .error(function() {

        });
}]);
