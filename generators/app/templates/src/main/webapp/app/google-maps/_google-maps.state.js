(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('google-maps', {
                parent: 'app',
                url: '/google-maps',
                data: {
                    authorities: [],
                    pageTitle: 'Google maps'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/google-maps/google-maps.html',
                        controller: 'GoogleMapsController'
                    }
                }
            });
    }

})();
