(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(googleMapsConfig);

    googleMapsConfig.$inject = ['uiGmapGoogleMapApiProvider'];

    function googleMapsConfig(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
               key: <%=apiKey%>,
               v: '3.28',
               libraries: 'weather,geometry,visualization,places'
           });
    }
})();
