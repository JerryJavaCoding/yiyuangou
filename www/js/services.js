/**
 * Created by jerry on 2016/12/01.
 */
angular.module('lqApp.services', [])
    .factory('drawcycleService', ['$http', function($http) {
        return {
            gethotItems: function(requestParams) {
                var url = config.basePath + '/drawcycle';
                return $http.get(url, requestParams);
            },
            getlastItems: function(requestParams) {
                var url = config.basePath + '/latestannounce';
                return $http.get(url, requestParams);
            },
            getRecommendItems: function() {
                var url = config.basePath + '/commons/recommended?recommendType=FRONT_PAGE';
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
                        'remember-me': 'Yes'
                    }
                });
            }

        };
    }])
    .factory('personService', ['$http', function($http) {
        return {
            home: function() {
                var url = config.basePath + '/customer/home';
                return $http.get(url);
            }
        };
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
