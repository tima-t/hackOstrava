angular.module('starter.controllers', [])

.controller('StarterCtrl', function($scope, LoginService ,$timeout, $ionicLoading, $state,sharedResource,$ionicHistory, $ionicPlatform, $ionicPopup) {
		//window.localStorage.removeItem('hasPublished');
		//if (window.localStorage.getItem('username') && window.localStorage.getItem('password')) {
			//LoginService.loginUser(window.localStorage.getItem('username'),  window.localStorage.getItem('password'))
			LoginService.loginUser("ricard0@mail.bg","1234567890")
			.then(
				function(data){
					console.log("success");
					$state.go('app.review_transactions');
				}
				,function(error){
					console.log('error');
			//		$state.go('login');
				}
			)
		//}
		// else{
		// 	//$state.go('login');
		// }
})
