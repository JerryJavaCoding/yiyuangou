angular.module('productDetail-controller', [])
    .controller('ProductDetailCtrl', ['$scope', 'prodService', 'drawcycleService', '$ionicModal', '$state', 'locals', '$ionicSlideBoxDelegate', '$window', '$stateParams', function($scope, prodService, drawcycleService, $ionicModal, $state, locals, $ionicSlideBoxDelegate, $window, $stateParams) {
        $scope.drawcycle = '';
        $scope.lastCycle={};//最新一期
        $scope.modal = '';
        $scope.prodPicDetail = '';
        $scope.prodImgs=[];
        var cartItems = locals.getArray("cartItems");
        $scope.goBack = function() {
            $window.history.go(-1);
         };
        $scope.drawcycleId = $stateParams.drawcycleId;
        function getData(){
        	drawcycleService.getProdDetail( $scope.drawcycleId).success(function(data) {
            $scope.drawcycle = data.body.drawCycleDetails;
             $scope.prodImgs=$scope.drawcycle.productImages;
             $scope.lastCycle.cycle=$scope.drawcycle.latestDrawCycle;
             $scope.lastCycle.cycleId=$scope.drawcycle.latestDrawCycleID;
        });    	
        };
        getData();
        //立即购买
        $scope.buyNow = function() {

            $scope.addToCart();
            $state.go('tab.cart');
        };
        //添加到购物车
        $scope.addToCart = function() {
            $scope.drawcycle.myBuyCnt = 1;
            cartItems.push($scope.drawcycle);
            locals.setObject("cartItems", cartItems);
        };
        // 图文详情
        $scope.openModal1 = function() {
            $ionicModal.fromTemplateUrl('picDetail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
                prodService.getProdPicDetail($scope.drawcycle.productID).success(function(data) {
                    $scope.prodPicDetail = data.body.fullDesc;
                })
            });

        };
        // 本期参与者
        $scope.particiton = [];
        $scope.openModal2 = function() {
            $ionicModal.fromTemplateUrl('particiton.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                
                var requestParam = {
                    drawcycleId: $scope.drawcycle.drawCycleID,
                    page: 1,
                    pageSize: 10
                };
               $scope.totalPage=2;
                $scope.loadMore=function(){
                    drawcycleService.getParticipation(requestParam).success(function(data) {
                    $scope.particiton = data.body.participationDetailsList;
                    requestParam.page++;
                    $scope.totalPage=data.body.totalPage;
                });
                }
                $scope.moreDataCanBeLoaded=function(){
                    if(requestParam.page> $scope.totalPage){
                        return false;
                    }else
                    return true;
                };
                $scope.modal.show();
            });

        };
        $scope.allCycle=[];

        //往期回顾
        $scope.openModal3 = function() {
            $ionicModal.fromTemplateUrl('cycles.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;     
				var cycleRequestParams={productId: $scope.drawcycle.productID,page:1,pageSize:30};
				prodService.getHistoryCircle(cycleRequestParams).success(function(data){
 				$scope.allCycle=data.body.drawCycleDetailsList;
 		
		});
                $scope.modal.show();
            });

        };
        //更改产品期数
        $scope.changeCycle=function(drawcycle){
        	
			$scope.drawcycle =drawcycle;
			$scope.drawcycleId=drawcycle.drawCycleID;
			$scope.modal.hide();
        };
         //更改产品期数,这个要重新查询一次
        $scope.changeDrawcycle=function(drawcycleId){
        	 $scope.drawcycleId =drawcycleId;
			getData();
        };

        $scope.openModal4 = function() {
            $ionicModal.fromTemplateUrl('share.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });

        };
        //计算详情
        $scope.calculateResult={};
        $scope.calcInforList=[];
        $scope.openModal5 = function() {
            $ionicModal.fromTemplateUrl('computeDetail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                drawcycleService.getComputeDetail($scope.drawcycleId).success(function(data){
                	$scope.calculateResult=data.body.calculateResult;
                	$scope.calcInforList=data.body.calcInforList;
                });
                $scope.modal.show();
            });

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
    }])
