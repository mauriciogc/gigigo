angular
    .module('app')
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("app/login");
    
        $stateProvider
            .state('app', {
                abstract: true,
                url: "/app",
                template: "<div data-ui-view></div>"
            })
            .state('app.login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl as login'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl as dashboard'
            });
    })