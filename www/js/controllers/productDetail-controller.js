angular.module('productDetail-controller', [])
    .controller('ProductDetailCtrl', ['$scope', 'drawcycleService', '$ionicSlideBoxDelegate', '$window', '$stateParams', function($scope, drawcycleService, $ionicSlideBoxDelegate, $window, $stateParams) {
        $scope.drawcycle = '';
       
        $scope.goBack = function() {
            $window.history.go(-1);
        };
        var drawcycleId = $stateParams.drawcycleId;
        drawcycleService.getProdDetail(drawcycleId).success(function(data) {
            $scope.drawcycle = data.body.drawCycleDetails;
        });
    }])
