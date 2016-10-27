// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
        templateUrl: 'templates/add_transaction.html'
      }
    }
  })

  .state('app.review_transactions', {
      url: '/review_transactions',
      views: {
        'menuContent': {
          templateUrl: 'templates/review_transactions.html'
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
          controller: 'PlaylistsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/add_transaction');
});
