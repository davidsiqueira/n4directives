(function (angular) {
    'use strict';

    angular.module('n4Directives.interceptor', [])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('n4Interceptor');
        }])
        .factory('n4Interceptor', [
            '$q',
            '$log',
            function ($q, $log) {
                var N4Interceptor = function () {
                };

                N4Interceptor.prototype = {
                    responseError: function (rejection) {
                        rejection.status = rejection.status || 400;

                        if (!!rejection.data) {
                            return $q.reject(angular.extend(new TypeError(rejection.data), { status: rejection.status }));
                        }

                        $log.error(rejection);
                        return $q.reject(angular.extend(new TypeError('Serviço indisponível, tente novamente.'), { status: rejection.status }));
                    }
                };

                return new N4Interceptor();
            }]);

}(window.angular));
