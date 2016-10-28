angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
		var recognition;
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
		
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.add_transaction', {
    url: '/add_transaction',
    views: {
      'menuContent': {
        templateUrl: 'templates/add_transaction.html',
				controller: 'addTransCtrl'
      }
    }
  })

  .state('app.review_transactions', {
      url: '/review_transactions',
      views: {
        'menuContent': {
          templateUrl: 'templates/review_transactions.html',
					controller: 'transactionsCtrl'
        }
      }
    })
    .state('app.set_reminder', {
      url: '/set_reminder',
      views: {
        'menuContent': {
          templateUrl: 'templates/set_reminder.html'
        }
      }
    })
    .state('app.budget', {
      url: '/budget',
      views: {
        'menuContent': {
          templateUrl: 'templates/budget.html',
        }
      }
    })
		.state('starter',{
			url:'/starter',
			controller: 'StarterCtrl'
		})

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/starter');
});
