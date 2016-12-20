// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$sceDelegateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-centrales', {
      url: '/chats/centrales',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
   .state('tab.chat-co2global', {
      url: '/chats/co2global',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-co2global.html',
          controller: 'ChatCo2globalCtrl'
        }
      }
    })
   .state('tab.chat-co2chile', {
      url: '/chats/co2chile',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-co2chile.html',
          controller: 'ChatCo2chileCtrl'
        }
      }
    })
  .state('tab.chat-fotovoltaica', {
      url: '/chats/fotovoltaica',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-fotovoltaica.html',
          controller: 'ChatFotovolataicaCtrl'
        }
      }
    })
  .state('tab.chat-charts', {
      url: '/chats/charts',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-charts.html',
          controller: 'ChatChartsCtrl'
        }
      }
    })
  .state('tab.chat-glosario', {
      url: '/chats/glosario',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-glosario.html',
          controller: 'ChatGlosarioCtrl'
        }
      }
    })

  .state('tab.chat-glosario-show', {
      url: '/chats/glosario/show',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-glosario-show.html',
          controller: 'ChatGlosarioShowCtrl'
        }
      }
    })

  .state('tab.fotosintesis', {
    url: '/fotosintesis',
    views: {
      'tab-fotosintesis': {
        templateUrl: 'templates/tab-fotosintesis.html',
        controller: 'FotosintesisCtrl'
      }
    }
  })

  .state('tab.fotosintesis-preguntas', {
      url: '/fotosintesis/preguntas',
      views: {
        'tab-fotosintesis': {
          templateUrl: 'templates/fotosintesis-preguntas.html',
          controller: 'FotosintesisPreguntasCtrl'
        }
      }
    })
  .state('tab.fotosintesis-resultado', {
      url: '/fotosintesis/resultado',
      views: {
        'tab-fotosintesis': {
          templateUrl: 'templates/fotosintesis-resultado.html',
          controller: 'FotosintesisResultadoCtrl'
        }
      }
    })
  .state('tab.semilla', {
    url: '/semilla',
    views: {
      'tab-semilla': {
        templateUrl: 'templates/tab-semilla.html',
        controller: 'SemillaCtrl'
      }
    }
  })
 .state('tab.semilla-show', {
      url: '/semilla/show',
      views: {
        'tab-semilla': {
          templateUrl: 'templates/semilla-show.html',
          controller: 'SemillaShowCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
  $ionicConfigProvider.backButton.text('Atrás');
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.youtube.com/**']);

});
