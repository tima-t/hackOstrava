angular.module('starter.controllers', [])


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


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
