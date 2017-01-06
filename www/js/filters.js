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
                case 'OPEN':
                    change = '进行中';
                    break;
                case 'COUNTDOWN':
                	change='即将揭晓';
                	break;
            }
            return change;
        }
    }).filter('ClaimStatusFilter',function(){
    	return function(input){
    		var res='';
    		switch(input){
    			case 'UNCLAIMED':res="未领取";break;
    			case 'CLAIMED':res="已领取";break;
    			case 'SHOWED':res="已晒单";break;
    			case 'LOGISTIC_SENT':res="已发货";break;
    			case 'PROCESSING':res="处理中";break;
   			
    		}
    		return res;

    	}
    });
