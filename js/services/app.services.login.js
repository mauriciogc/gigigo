angular
    .module('app.services.login', [])
    .factory('LoginSrv', ($http, $q) => {
        var self = {
            datalogin : {},
            msnError : '',
            validaLogin : (_data) => {            
                var q = $q.defer();
                
                $http({
                    method  : 'POST',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/login',
                    data    : $.param(_data),
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
                    self.datalogin = data.user;
                    q.resolve();
                    
                })
                .error((data, status, headers, config) => {
                    self.msnError = data.message;
                    q.reject();
                });

                return q.promise;
            }
        }
        
        return self;
    });