/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage) {
		'use strict';

		var todos = $scope.todos = todoStorage.getAll();

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';

			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : null;
		});

		$scope.onChangeChecked = function (todo) {
			todoStorage.update({
				id: todo.id,
				todo:{
				title: todo.title,
				completed: !todo.completed
				}
			});
		};

		$scope.addTodo = function () {
			var newTodo = $scope.newTodo.trim();
			if (!newTodo.length) {
				return;
			}

			var savedTodo = todoStorage.create({todo:{
				title: newTodo,
				completed: false
			}});

			todos = $scope.todos = todoStorage.getAll();

			$scope.newTodo = '';
		};

		$scope.editTodo = function (todo) {
			// Clone the original todo to restore it on demand.
			$scope.editedTodo = todo;
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();

			todoStorage.update({
				id: todo.id,
				todo:{
				title: todo.title.trim()
				}
			});

			if (!todo.title) {
				$scope.removeTodo(todo);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			todoStorage.delete({id: todo.id});
			todos.splice(todos.indexOf(todo), 1);
		};

		$scope.clearCompletedTodos = function () {
			varcompletedTodos = todos.filter(function (val) {
				return val.completed;
			});

			completedTodos.forEach(function (completed) {
				todoStorage.delete({id: completed.id});
			});

			$scope.todos = todos = todos.filter(function (val) {
				return !val.completed;
			});
		};

		$scope.markAll = function (completed) {
			todos.forEach(function (todo) {
				todo.completed = !completed;

				todoStorage.update({
					id: todo.id,
					todo:{
						completed: todo.completed
					}
				});
			});
		};
	});
