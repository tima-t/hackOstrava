var services = angular.module('starter.services',[])

.service('LoginService',function(api,$q,$http) {
    return {

        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
						var req =
						{
 							method: 'Get',
 							url: api+'/login',
							params:{
      				"userid":name,
      				"password":pw
						},
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						$http(req).then(
							function(resp){
								console.log(resp.data.response);
								if(resp.data.response && resp.data.response.status == 'OK' ){
									console.log("response");
									window.localStorage.setItem("token",resp.data.response.token);
									window.localStorage.setItem("username", name);
									window.localStorage.setItem("password", pw);
									deferred.resolve(resp.data);
								}
								else{
									console.log(error);
									console.log("error");
								deferred.reject(resp.data);
								}
							},
							function(resp){
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
})
.service('TransactionsService',function(api,$q,$http) {
    return {

        getLatest: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;
						var req =
						{
 							method: 'Get',
 							url: api+'/transactions',
							params: {
      				token : window.localStorage.getItem('token')
						},
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						$http(req).then(
							function(resp){
								console.log(resp.data.response);
								if(resp.data.response && resp.data.response.status == 'OK' ){
									console.log("response");
									deferred.resolve(resp.data.response);
								}
								else{
									console.log(error);
									console.log("error");
								deferred.reject(resp.data);
								}
							},
							function(resp){
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
});
