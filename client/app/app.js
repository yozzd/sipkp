'use strict';

angular.module('sipkpApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'validation.match',
    'mgcrea.ngStrap',
    'ngAnimate',
    'permission',
    'restangular',
    'ncy-angular-breadcrumb',
    'ui.select',
    'angularMoment',
    'chart.js',
    'blockUI',
    'angular-spinkit',
    'checklist-model'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, uiSelectConfig, blockUIConfig) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        //restangular config
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setDefaultHttpFields({
            cache: false
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation) {
            if (operation === 'remove') {
                return undefined;
            }
            return elem;
        });

        //ui-select config
        uiSelectConfig.theme = 'select2';

        //block-ui
        blockUIConfig.delay = 0;
        blockUIConfig.templateUrl = 'components/template/blockui.tpl.html';
        blockUIConfig.autoBlock = false;
    })

.factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                (state || (state = $injector.get('$state'))).go('login');
                // remove any stale tokens
                $cookies.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function ($rootScope, $state, Auth, Permission, $q, amMoment) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (next.authenticate) {
            Auth.isLoggedIn(function (loggedIn) {
                if (!loggedIn) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        }
    });
    //angular-permission
    Permission
        .defineRole('admin', function () {
            var deferred = $q.defer();
            Auth.getCurrentUser(function (data) {
                if (data.role === 'admin') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        })
        .defineRole('user', function () {
            var deferred = $q.defer();
            Auth.getCurrentUser(function (data) {
                if (data.role === 'user') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        });
    //angular-moment
    amMoment.changeLocale('id');
});