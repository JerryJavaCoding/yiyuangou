/**
 * Created by zhoupan on 2015/9/23.
 */
angular.module('lqApp.filters', [])
    .filter('phoneNumberFilter', function() {
        return function(input) {
            return input.replace(/tank/, "=====")
        };
    })
    .filter('drawStatusFilter', function() {
        return function(input) {
            var change = "";
            switch (input) {
                case 'ANNOUNCED':
                    change = '已揭晓';
                    break;
                case 'aaa':
                    change = '进行中';
                    break;
            }
            return change;
        }
    });
