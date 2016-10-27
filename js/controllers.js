angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

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
	window.localStorage.removeItem('hasPublished');
	if (window.localStorage.getItem('username') && window.localStorage.getItem('password')) {
		LoginService.loginUser(window.localStorage.getItem('username'),  window.localStorage.getItem('password'))
		.then(
			function(data){
				sharedResource.addItem('word_info',data.content.last_word);
				$state.go('tab.word');
			}
			,function(error){
				$state.go('login');
			}
		)
	}
	else{
		$state.go('login');
	}

	//handle back button
	$ionicPlatform.registerBackButtonAction(function(event) {
		if (location.hash === "#/login" || location.hash === "#/tab/word" )
		{ // your check here
			$ionicPopup.confirm({
				title: 'System warning',
				template: 'are you sure you want to exit?'
			}).then(
				function(res) {
					if (res) {
						ionic.Platform.exitApp();
					}
				})
		}
		else{
			$ionicHistory.goBack();
		}
	}, 100);

})
