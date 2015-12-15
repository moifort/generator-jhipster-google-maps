'use strict';

angular.module('<%=angularAppName%>')
    .config(function ($stateProvider) {
        $stateProvider
            .state('google-map', {
                parent: 'site',
                url: '/google-map',
                data: {
                    authorities: [],
                    pageTitle: 'Google map'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/google-map/google-map.html',
                        controller: 'GoogleMapController'
                    }
                }
            });
    });
