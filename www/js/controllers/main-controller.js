/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('main-controller', [])
    .controller('MainCtrl', ['drawcycleService', '$ionicSlideBoxDelegate', '$scope', '$timeout', '$ionicLoading', '$data', '$http', function(drawcycleService, $ionicSlideBoxDelegate, $scope, $timeout, $ionicLoading, $data, $http) {
        $scope.recommandItems = [];
        $scope.hotItems = [];
        $scope.lastAnounItems = [];
        //首页轮播推荐商品
        drawcycleService.getRecommendItems().success(function(resp) {
            $scope.recommandItems = resp.body.recommandList;
            $ionicSlideBoxDelegate.update();
        });
        //最新揭晓
        var lastItemRequestParam = { calculatingSize: 50, announceSize: 100, viewMode: 'NORMAL' };
        drawcycleService.getlastItems(lastItemRequestParam).success(function(resp) {
            $scope.lastAnounItems = resp.body.drawCycleDetailsList
        });
        //人气商品
        var hotItemRequestParam = { searchBy: 'progress', categoryId: 1, page: 1, pageSize: 6, drawStatus: 'OPEN' };
        drawcycleService.gethotItems(hotItemRequestParam).success(function(resp) {
            $scope.hotItems = resp.body.drawCycleDetailsList;
        });





        /* $scope.isHaveMoreData = true;

         $scope.loadMore = function() {
             $data.findAll("main", { pageSize: $scope.pagination.pageSize, currentPage: $scope.pagination.currentPage++ })
                 .success(function(data) {
                     if (data == null) {
                         $scope.isHaveMoreData = false;
                         return;
                     }

                     $scope.items = $scope.items.concat(data);

                 })
                 .finally(function() {
                     $timeout(function() {
                         $scope.$broadcast("scroll.infiniteScrollComplete");
                     }, 2000);
                 });
         };

         $scope.$on("stateChangeSuccess", function() {
             $scope.loadMore();
         });*/






    }])
