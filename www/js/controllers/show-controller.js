angular.module('show-controller', [])
    .controller('toShowCtrl', ['$scope', '$window', '$sce', '$stateParams', function($scope, $window, $sce, $stateParams) {
        $scope.goBack = function() {
            $window.history.go(-1);
        }
        $scope.actionUrl = $sce.trustAsResourceUrl(config.basePath + "/customer/add-prizeshow");
        $scope.winId = $stateParams.winId;
    }])
    .controller('myShowCtrl', ['$scope', 'show', '$state', function($scope, show, $state) {
        $scope.showRecords = [];
        $scope.totalPage = 2;
        $scope.goBack = function() {
            $state.go("tab.personal");
        }
        var requestParams = { page: 0, pageSize: 4 };
        requestParams.page=0;
        $scope.doRefresh = function() {
        	 requestParams.page = 1;
            getData().finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            });;
        }

        function getData() {
            return show.myshow(requestParams).success(function(data) {
                $scope.showRecords= $scope.showRecords.concat(data.body.prizeShowItems);
                $scope.totalPage = data.body.totalPage;
            })
        }
        $scope.moreDataCanBeLoaded = function() {
        	// debugger;
             if ((requestParams.page + 1) > $scope.totalPage)
                return false;
            else
                return true;
        }
        
        $scope.loadMore = function() {
        	requestParams.page++;
            getData().finally(function(){
            	 $scope.$broadcast('scroll.infiniteScrollComplete');
            });          
          

        };

        // $scope.$on('stateChangeSuccess', function() {
        //     $scope.loadMoreData();
        // });
    }])
