angular.module('starter.controllers')

.factory('sharedResource', function($rootScope) {
    var resource = {};
    var resourceService = {};

    resourceService.addItem = function(key,value) {
        resource[key] = value;
    };
    resourceService.list = function() {
        return resource;
    };
		resourceService.getItem = function(key) {
				return resource[key];
		};

    return resourceService;
});
