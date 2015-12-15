'use strict';

angular.module('<%=angularAppName%>')
    .config(function ($stateProvider) {
        $stateProvider
            .state('google-maps', {
                parent: 'site',
                url: '/google-maps',
                data: {
                    authorities: [],
                    pageTitle: 'Google maps'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/google-maps/google-maps.html',
                        controller: 'GoogleMapsController'
                    }
                }
            });
    });
