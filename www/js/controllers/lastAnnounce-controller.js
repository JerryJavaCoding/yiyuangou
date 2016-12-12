/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('lastAnnounce-controller', [])
    .controller('lastAnounceCtrl', ['$scope', '$window', 'drawcycleService', '$timeout', '$interval', '$ionicLoading', '$data', function($scope, $window, drawcycleService, $timeout, $interval, $ionicLoading, $data) {
        $scope.lastItems = [];
        var requestParams = {
            page: 1,
            pageSize: 20
        };

        var totalPage = 2;

        function getLastItems() {
            return drawcycleService.getlastItems(requestParams).success(function(data) {
                $scope.lastItems = data.body.drawCycleDetailsList;
                totalPage = data.body.totalPage;
                for (i = 0; i < $scope.lastItems.length; i++) {
                    if ($scope.lastItems[i].drawStatus == 'COUNTDOWN')
                        cutTimeBySecond($scope.lastItems[i]);
                }
            });
        };
         getLastItems();
        $scope.doRefresh = function() {
            requestParams.page = 1;
            getLastItems().finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        //倒计时
        function GetRTime(item) {

            var EndTime = new Date(item.drawDate);
            var NowTime = new Date();
            var t = EndTime.getTime() - NowTime.getTime();
            // var d = 0;
            // var h = 0;
            var m = 0;
            var s = 0;
            if (t > 0) {
                // d = Math.floor(t / 1000 / 60 / 60 / 24);
                // h = Math.floor(t / 1000 / 60 / 60 % 24);
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
                item.leaveTime = '揭晓倒计时:' + m + ":" + s;
            } else {
                item.leaveTime = '正在计算中...';
                $timeout(function() {
                    reloadRoute();
                }, 2000);
                item.leaveTime = '';
            }


        }


        //每秒减一
        function cutTimeBySecond(item) {
            $interval(function() {
                GetRTime(item);
            }, 1000);
        };

        function reloadRoute() {
            $window.location.reload();
        };

       

        // $scope.$on("stateChangeSuccess",function(){
        //     $scope.loadMore();
        // });


        // $ionicModal.fromTemplateUrl("templates/search-modal-gqpt.html", {
        //     scope: $scope,
        //     animation: "slide-in-up"
        // }).then(function(modal) {
        //     $scope.modal = modal;
        // });


        // $scope.openModal = function() {
        //     console.log("{{}}",pagination1.currentPage);
        //     $scope.queryConditions.currentPage = 0;
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

    }])
