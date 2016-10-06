angular
    .module('app.dashboard', ['app.services.dashboard'])
    .controller('dashboardCtrl', function ($rootScope, $state, $localStorage, DashboardSrv) {
        var dashboard = this,
            token = $localStorage.login;
        
        dashboard.products = [];
        dashboard.tmpKey = 0;
        dashboard.title = 'Products';
        dashboard.closeSession = 'Logout';
        dashboard.subTitle = 'Product';
        dashboard.btnModal = 'Save Product';
        dashboard.typeModal = '';
        dashboard.tableHeader = ['Id','Name','Edit', 'Remove'];
    
    
        dashboard.continuaflujo = () => {
            dashboard.getProducts();
        }
        
        dashboard.getProducts = () => {
            DashboardSrv.getProducts(token)
            .then(() => {
                dashboard.products = DashboardSrv.dataProducts;
            },
            () => {
                $rootScope.backToLogin();
                console.error('app.dashboard - getProducts');
            });
        }
        
        dashboard.deleteProduct = (_id,_key) => {
            swal({
                title: "Seguro que deseas borrarlo?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si borralo!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false
            },
            () => {
                DashboardSrv.deteleProduct(token,_id)
                .then(() => {
                    swal("Borrado!", "Hemos borrado el producto seleccionado!!!", "success");
                    dashboard.products.splice(_key, 1);
                },
                () => {
                    $rootScope.backToLogin();
                    console.error('app.dashboard - getProducts');
                }); 
            });
        }
        
        dashboard.editProduct = (_product,_key) => {
            dashboard.frmProduct = angular.copy(_product);
            dashboard.typeModal = 'e';
            dashboard.tmpKey = _key;
        }
        
        dashboard.addProduct = () => {
            dashboard.frmProduct = {};
            dashboard.typeModal = 'a';
        }
  
        dashboard.saveEditProduct = () => {
            if(dashboard.typeModal === 'e') { 
                DashboardSrv.editProduct(token,dashboard.frmProduct)
                .then(() => {
                    //dashboard.getProducts();
                    dashboard.products[dashboard.tmpKey] = angular.copy(dashboard.frmProduct);
                    $('#frmModal').modal('hide');
                },
                () => {
                    $('#frmModal').modal('hide');
                    $rootScope.backToLogin();
                    console.error('app.dashboard - editProduct');
                }); 
            }else if(dashboard.typeModal === 'a'){
                DashboardSrv.addProduct(token,dashboard.frmProduct)
                .then(() => {
                    dashboard.getProducts();
                    $('#frmModal').modal('hide');
                },
                () => {
                    $('#frmModal').modal('hide');
                    $rootScope.backToLogin();
                    console.error('app.dashboard - addProduct');
                }); 
            }
        }
        
        dashboard.closeSession = () => {
            DashboardSrv.closeSession(token)
            .then(() => {
                $rootScope.backToLogin();
            },
            () => {
                $rootScope.backToLogin();
                console.error('app.dashboard - addProduct');
            }); 
        }
        
        $rootScope.validaLogin(dashboard.continuaflujo);  
    });