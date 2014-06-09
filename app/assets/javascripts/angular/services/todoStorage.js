/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc')
	.factory('todoStorage', function ($resource) {
		'use strict';

		return $resource('api/v1/todos/:id.json', {
        id: '@id'
    }, {
        getAll: {
            method: 'GET', isArray: true
        },
        getOne: {
            method: 'GET', isArray: false
        },
        create: {
            method: 'POST', isArray: false
        },
        update: {
            method: 'PUT', isArray: false
        },
        delete: {
            method: 'DELETE'
        }
    });
		// var STORAGE_ID = 'todos-angularjs';

		// return {
		// 	get: function () {
		// 		return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		// 	},

		// 	put: function (todos) {
		// 		localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		// 	}
		// };
	});
