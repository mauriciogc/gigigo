angular
    .module('app')
    .controller('rootCtrl', ($rootScope, $state, $localStorage) => {
        $rootScope.validaLogin = (_cb) => {
            if(typeof $localStorage.login !== 'object'){
                $state.go('app.login', {});
            }else{
                _cb(true);
            }
        }
    
        $rootScope.backToLogin = () => {
            $state.go('app.login', {});
        }
    });