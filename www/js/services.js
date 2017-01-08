/**
 * Created by jerry on 2016/12/01.
 */
angular.module('lqApp.services', [])
    .factory('drawcycleService', ['$http', function($http) {
        return {
            gethotItems: function(requestParams) {
                return $http({
                    method: 'GET',
                    url: config.basePath + '/drawcycle',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: requestParams
                })
            },
            getlastItems: function(requestParams) {
                return $http({
                    method: 'GET',
                    url: config.basePath + '/latestannounce',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: requestParams
                })
            },
            getRecommendItems: function() {
                var url = config.basePath + '/commons/recommended?recommendType=FRONT_PAGE';
                return $http.get(url);
            },
            getCategoryList: function() {
                var url = config.basePath + '/category/list';
                return $http.get(url);
            },
            getProdDetail: function(drawcycleId) {
                var url = config.basePath + '/drawcycledetails?drawcycleId=' + drawcycleId;
                return $http.get(url);
            },
            getParticipation: function(requestParams) {
                return $http({
                    method: 'GET',
                    url: config.basePath + '/participation',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: requestParams
                })
            },
            getComputeDetail: function(drawcycleId) {
                var url = config.basePath + '/drawresult?drawcycleId=' + drawcycleId;
                return $http.get(url);
            }
        }
    }])
    .factory('loginService', ['$http', function($http) {
        return {
            doLogin: function(formUser) {
                return $http({
                    method: 'POST',
                    url: config.basePath + '/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "async": true,
                    "crossDomain": true,
                    params: {
                        'username': formUser.phoneNumber,
                        'password': formUser.password,
                        'remember-me': formUser.rememberMe == true ? 'Yes' : 'No'

                    }
                });
            },
            doLogout: function() {
                var url = config.basePath + '/customer/logout';
                return $http.get(url);
            }

        };
    }])
    .factory('register', ['$http', function($http) {
        return {
            validate: function(formUser) {
                return $http({
                    method: 'POST',
                    url: config.basePath + '/registraion/validate',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "async": true,
                    "crossDomain": true,
                    params: {
                        'cellphone': formUser.phoneNumber,
                        'password': formUser.password,


                    }
                });
            },
            registe: function(customerCode) {
                return $http({
                    method: 'POST',
                    url: config.basePath + '/registraion/register',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "async": true,
                    "crossDomain": true,
                    params: {
                        'customerCode': customerCode

                    }
                });
            },
            modifyPassword: function(originalPwd, newPwd) {
                return $http({
                    method: 'POST',
                    url: config.basePath + '/resetpwd/update',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    "async": true,
                    "crossDomain": true,
                    params: {
                        'originalPwd': originalPwd,
                        'newPwd': newPwd
                    }
                })
            }
        }
    }])
    .factory('prodService', ['$http', function($http) {
        return {
            getProdPicDetail: function(productID) {
                var url = config.basePath + '/productdetails?productID=' + productID;
                return $http.get(url);
            },
            getHistoryCircle: function(requestParams) {
                return $http({
                    method: 'GET',
                    url: config.basePath + '/allcycles',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: requestParams
                })
            }
        }
    }])
    .factory('personService', ['$http', function($http) {
        return {
            home: function() {
                var url = config.basePath + '/customer/home';
                return $http.get(url);
            },
            'purchaseHistory': function() {
                var url = config.basePath + '/customer/purchase-history?page=1&pageSize=10';
                return $http.get(url);
            },
            winHistory: function() {
                var url = config.basePath + '/customer/winprize?page=1&pageSize=10';
                return $http.get(url);
            },
            accountDetail: function() {
                var url = config.basePath + '/customer/balance-history?page=1&pageSize=10&balanceSimbol=POSITIVE';
                return $http.get(url);
            }
        };
    }])

//本地化存储数据  
.factory('locals', ['$window', function($window) {
        return {
            //存储单个属性  
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性  
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储  
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            //读取对象  
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            //初始化为数组对象
            getArray: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }

        }
    }])
    .factory('checkOut', ['$http', function($http) {
        return {
            pay: function(requestParams) {
                // var data = JSON.stringify(requestParams);

                var url = config.basePath + '/checkout';
                return $http.post(url, requestParams);

            },
            recharge: function(amout) {
                var url = config.basePath + '/customer/recharge?amout=' + amout;
                return $http.get(url);
            }
        }
    }])
    .factory("winprize", function($http) {
        return {
            pickUp: function(requestParams) {
                var url = config.basePath + '/customer/claim-post';
                //return $http.get(url,requestParams);
                return $http({
                    url: url,
                    method: 'GET',
                    params: requestParams
                });
            },
            receive: function(winprizeId) {
                var url = config.basePath + '/customer/claim-confirm?winprizeId=' + winprizeId;
                return $http.get(url);

            }
        }
    })
    .factory('show', ['$http', function($http) {
        return {
            showRecord: function(requestParams) {
                var url = config.basePath + '/commons/prizeshow-list';
                return $http({
                    url: url,
                    method: 'GET',
                    params: requestParams
                });
            },
            myshow: function(requestParams) {
                var url = config.basePath + '/customer/my-prizeshow';
                return $http({
                    url: url,
                    method: 'GET',
                    params: requestParams
                });
            }
        }
    }])
    .factory('$data', function($http) {
        return {

            findAll: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/findAll.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: requestParams });

            },
            findAllByPage: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/findAllByPage.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: requestParams });

            },
            login: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/login.do?phoneNumber=" + requestParams.phoneNumber + "&password=" + requestParams.password + "&callback=JSON_CALLBACK";
                return $http.jsonp(url);
            },
            register: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/register.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: requestParams });
            },
            modifyPassword: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/modifyPassword.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: requestParams });
            },
            getCheckCode: function(tableName) {
                var url = config.basePath + tableName + "/getCheckCode.do?callback=JSON_CALLBACK";
                return $http.jsonp(url);
            },

            findById: function(tableName, id) {
                var url = config.basePath + tableName + "/findById.do?id=" + id + "&callback=JSON_CALLBACK";
                return $http.jsonp(url);

            },
            findByConditions: function(tableName, requestParams) {
                var url = config.basePath + tableName + "/findByConditions.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: requestParams });
            },

            remove: function(twzx) {
                twzxs.splice(twzxs.indexOf(twzx), 1);
            },

            add: function(tableName, postData) {
                var url = config.basePath + tableName + "/add.do?callback=JSON_CALLBACK";
                return $http.jsonp(url, { params: postData });
            }
        }

    });
