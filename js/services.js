var services = angular.module('starter.services',[])

.service('LoginService',function(api,$q,$http,$httpParamSerializerJQLike) {
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
								if(resp.response && response.status == 'OK' ){
									console.log("response");
									window.localStorage.setItem("token", resp.token);
									window.localStorage.setItem("username", name);
									window.localStorage.setItem("password", pw);
									deferred.resolve(resp.data);
								}
								else{
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