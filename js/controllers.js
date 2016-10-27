angular.module('starter.controllers', [])

.controller('StarterCtrl', function($scope, LoginService , TransactionsService,$timeout, $ionicLoading, $state,sharedResource,$ionicHistory, $ionicPlatform, $ionicPopup) {
			LoginService.loginUser("ricard0@mail.bg","1234567890")
			.then(
				function(data){
					console.log("success");
						$state.go('app.review_transactions');
				}
				,function(error){
					console.log('error');
				}
			)
})

.controller('transactionsCtrl', function($scope,$state,sharedResource,$ionicPopup,$ionicTabsDelegate,$ionicLoading,TransactionsService) {
	$scope.$on("$ionicView.beforeEnter", function(event) {
		$scope.data={};
		$scope.data.numTransactions = sharedResource.getItem('numTransactions');
		$scope.data.transactions = sharedResource.getItem('transactions');
	})


	$scope.init = function(){

		TransactionsService.getLatest()
		.then(
			function(dataTrans) {
				console.log(dataTrans);
				sharedResource.addItem('numTransactions',dataTrans.numTransactions);
				sharedResource.addItem('transactions', dataTrans.transactions);
				console.log(sharedResource.list());
				console.log();
				$scope.data.numTransactions = dataTrans.numTransactions;
				$scope.data.transactions = dataTrans.transactions;
			},
			function (errorTrans) {
				console.log('trans error');
			}
		)
	}
})
