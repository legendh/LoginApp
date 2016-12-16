angular.module('mainApp', [])
    .controller('loginCtrl', ['$scope','$http','$timeout','$window',function ($scope, $http, $timeout, $window ) {

        $scope.errorMessage = '';
        $scope.message = '';
        $scope.formData = {};

        $scope.login = function() {
            $http({
                url: '/login',
                method: "POST",
                data: $scope.formData
            }).
            then(function(response) {
                if(response.data.status == true){
                    $scope.alertClass= 'success';
                    $scope.message = 'You\'re logged in. Welcome Fob Solutions Team.';
                    $timeout(function(){
                        $window.location.href='success';
                    },2000)


                }else{
                    $scope.alertClass = 'danger';
                    $scope.message = response.data.message;

                }
            }).catch(function() {
                $scope.alertClass = 'warning';
                $scope.message = 'Server is not working.';
            });
        }
    }]);