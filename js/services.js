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
.service('TransactionsService',function(api,$q,$http,$httpParamSerializerJQLike) {
    return {

        addNew: function(description, price, category) {
            var deferred = $q.defer();
                        var promise = deferred.promise;
            						var req =
            						{
             							method: 'Post',
             							url: api+'add_transaction?token=' + window.localStorage.getItem('token'),
             							data:
                          								$httpParamSerializerJQLike({
                                					"format":"sms",
                          								"text":description + " " + price + " tags:" + category
                          }),
            							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            						}
            						$http(req).then(
            							function(resp){
            							  console.log(req);
            								console.log(resp.data.response);
            								if(resp.data.response && resp.data.response.status == 'OK'){
            									console.log("response");

            								  if(resp.data.response.parseStatus == 'success')  {
            									      deferred.resolve(resp.data.response);
            									}
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
        },

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

									function compare(a,b) {
                                      if (a.tags < b.tags)
                                        return -1;
                                      if (a.tags > b.tags)
                                        return 1;
                                      return 0;
                                    }

                                    var response = resp.data.response;
                                    response.transactions.sort(compare);

									deferred.resolve(response);
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

.service('barcodeService',function(api,$q,$http,apiBarcode) {
    return {

        getProduct: function(code) {
            var deferred = $q.defer();
            var promise = deferred.promise;
						var req =
						{
 							method: 'Get',
 							url: apiBarcode+code,
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						$http(req).then(
							function(resp){
								console.log(resp);
								deferred.resolve(resp.data);
							},
							function(resp){
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
})

.service('budgetService',function(api,$q,$http){
	return{
		getBudget: function() {
				var deferred = $q.defer();
				var promise = deferred.promise;
				var req =
				{
					method: 'Get',
					url: api + "budgets/",
					params: {
						'token': window.localStorage.getItem('token')
					},
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}
				$http(req).then(
					function(resp){
						console.log(resp);
						deferred.resolve(resp);
					},
					function(resp){
						deferred.reject(resp);
					});
				return promise;
		}
	}
})
