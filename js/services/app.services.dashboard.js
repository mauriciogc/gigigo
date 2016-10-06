angular
    .module('app.services.dashboard', [])
    .factory('DashboardSrv', ($http, $q) => {
        var self = {
            dataProducts : [],
            msnError : '',
            getProducts : (_data) => {            
                var q = $q.defer();    
                
                $http({
                    method  : 'GET',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/products?token='+_data.token,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
                    self.dataProducts = data.products;
                    q.resolve();
                    
                })
                .error((data, status, headers, config) => {
                    self.msnError = data.message;
                    q.reject();
                });

                return q.promise;
            },
            addProduct : (_data,_product) => {            
                var q = $q.defer();    

                $http({
                    method  : 'POST',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/product?token='+_data.token,
                    data    : 'name='+_product.name,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
                    q.resolve();
                })
                .error((data, status, headers, config) => {
                    self.msnError = data.message;
                    q.reject();
                });

                return q.promise;
            },
            editProduct : (_data,_product) => {            
                var q = $q.defer();    

                $http({
                    method  : 'PUT',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/product/'+_product.id+'?token='+_data.token,
                    data    : 'name='+_product.name,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
                    q.resolve();

                })
                .error((data, status, headers, config) => {
                    self.msnError = data.message;
                    q.reject();
                });

                return q.promise;
            },
            deteleProduct : (_data,_id) => {            
                var q = $q.defer();    

                $http({
                    method  : 'DELETE',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/product/'+_id+'?token='+_data.token,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
                    q.resolve();
                })
                .error((data, status, headers, config) => {
                    self.msnError = data.message;
                    q.reject();
                });

                return q.promise;
            },
            closeSession : (_data) => {
                var q = $q.defer();    

                $http({
                    method  : 'GET',
                    url     : 'https://mxlab.s.gigigoapps.com/examen/logout?token='+_data.token,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
                .success((data, status, headers, config) => {
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