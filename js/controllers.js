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
	//reload
	$scope.$on("$ionicView.beforeEnter", function(event) {
	  $scope.init();
		$scope.data={};
		$scope.data.numTransactions = sharedResource.getItem('numTransactions');
		$scope.data.transactions = sharedResource.getItem('transactions');
	})

  $scope.currTag = "";

  $scope.isNewTag = function(transaction) {
    console.log(transaction);
      if(transaction.tags != $scope.currTag) {
          $scope.currTag = transaction.tags;
          return true;
      }
      return false;
  }

	$scope.init = function(){
		$scope.data={};
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
.controller('addTransCtrl', function($scope,$state,sharedResource,$ionicPopup,$ionicTabsDelegate,$ionicLoading,TransactionsService,$cordovaBarcodeScanner,barcodeService,$ionicPopup) {
	//reload

	$scope.$on("$ionicView.beforeEnter", function(event) {
		$scope.data = {};
	})

	$scope.addTransaction = function() {
	      console.log($scope);
	      TransactionsService.addNew($scope.data.description, $scope.data.price, $scope.data.category)
	      .then(
	            function(dataTrans) {
        				  console.log(dataTrans);
        				  $state.go('app.review_transactions');
        			},
        			function (errorTrans) {
        				  console.log('trans error');
        			}
	      )
	};

	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
					console.log(imageData.text);
					barcodeService.getProduct(imageData.text)
					.then(
						function(data){
							if (data.valid == 'true') {
								console.log(data + "valid bar");
								$scope.data.description = data.description;
								$scope.data.price = data.avg_price;
							}
							else{
									console.log(data + "valid bar");
								var alertPopup = $ionicPopup.alert({
									title: 'Warning!',
									template: ("No info about this product")
								});
							}
						},
						function(error){
							console.log(error);
						}

					)

        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

})
