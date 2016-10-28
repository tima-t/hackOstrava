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
				sharedResource.addItem('numTransactions',dataTrans.numTransactions);
				sharedResource.addItem('transactions', dataTrans.transactions);
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

	$scope.voice="Use Voice";


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
				$scope.recognizedText = "";
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

		$scope.record = function() {
				var recognition = new SpeechRecognition(); // To Device
				recognition.lang = 'en-US';

			recognition.onresult = function(event) {
			if (event.results.length > 0) {
				var voiceInfo = event.results[0][0].transcript.split(" ");
				console.log(voiceInfo);
				$scope.data.category = voiceInfo[0] || "";
				$scope.data.price = voiceInfo[1] || "";
				var description = "" ;
				for (var i = 2; i < voiceInfo.length; i++) {
					description +=  voiceInfo[i] + " ";
				}
				$scope.data.description = description;
				$scope.$apply();
				}
			};

			recognition.start();
		};
})

.controller('budgetCtrl', function($scope,$state,sharedResource,$ionicPopup,$ionicTabsDelegate,$ionicLoading,budgetService) {
  $scope.data={};

	$scope.$on("$ionicView.beforeEnter", function(event) {
		$scope.data.numTransactions = sharedResource.getItem('numTransactions');
		$scope.data.transactions = sharedResource.getItem('transactions');
	})

  	$scope.showChart = function() {

          var balance = document.getElementById("budgetBalance");
          balance.style.display.="none";

  	      var chart = document.getElementById("canvasChart");
    			chart.style.display="block";

  	      var trs = $scope.data.transactions;
          var tags = {};
          var count = 0;
          var currTag = "";

          for(var tr in trs) {

              currTag = trs[tr].tags;

              if(tags[currTag]){
                  tags[currTag] += trs[tr].amount;
              }
              else {
                  tags[currTag] = trs[tr].amount;
              }
          }

          console.log("tags : " + tags);

          var keys = [];
          var values = [];

          for(var i in tags) {
              keys.push(i);
              values.push(tags[i]);
          }
          console.log("labs : " + keys);
          console.log("labs : " + values);

          $scope.data.labels = keys;
          $scope.data.data = values;

  	};


	$scope.showBalance = function(){
		budgetService.getBudget().then(
			function(success){
				var chart = document.getElementById("canvasChart");
				chart.setAttribute("style", chart.getAttribute("style") + " display:hidden;");

        var balance = document.getElementById("budgetBalance");
        balance.setAttribute("style", balance.getAttribute("style") + " display:block;");

				console.log(success.data.response.budgets[0].balance);
				$scope.balance = success.data.response.budgets[0].balance ;
				$scope.limit = success.data.response.budgets[0].limit;
				$scope.period = success.data.response.budgets[0].period;
				$scope.spent = success.data.response.budgets[0].spent;


			},
			function(error){
				console.log(error);
			}
		)
	}
})
