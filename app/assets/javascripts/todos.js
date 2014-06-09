//= require_self

//= require_directory ./angular/controllers
//= require_directory ./angular/directives
//= require_directory ./angular/services

angular.module('todomvc', ['ngRoute', 'ngResource'])
  .config(function ($routeProvider) {
    'use strict';

    $routeProvider.when('/', {
      controller: 'TodoCtrl',
      templateUrl: 'todomvc-index.html'
    }).when('/:status', {
      controller: 'TodoCtrl',
      templateUrl: 'todomvc-index.html'
    }).otherwise({
      redirectTo: '/'
    });
  });