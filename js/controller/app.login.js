angular
    .module('app.login', ['app.services.login'])
    .controller('loginCtrl', function ($state, $localStorage, LoginSrv) {
        var login = this;

        login.frm = {};
        login.tieneError = false;
        login.msnError = '';
        $localStorage.login = undefined;

        login.sendData = () => {
            LoginSrv.validaLogin(login.frm)
            .then(() => {
                var data = LoginSrv.datalogin;

                login.tieneError = false;
                $localStorage.login = data;
                $state.go('app.dashboard', {});
            },
            () => {
                login.tieneError = true;
                login.msnError = LoginSrv.msnError;
                $localStorage.login = undefined;
                console.error('app.login - validaLogin');
            });
        }
    })