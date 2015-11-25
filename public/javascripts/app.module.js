(function () {
  'use strict';
  
  angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/projects');

      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: 'partials/login/index.html',
          controller: 'LoginController',
          controllerAs: 'loginController' 
        })

        .state('projects', {
          url: '/projects',
          templateUrl: 'partials/projects/index.html',
          controller: 'ProjectsController',
          controllerAs: 'projectsController',
          resolve: {

            users: function (Users) {
              return Users.get();
            },

            projects: function (Projects, users) {
              return Projects.get();
            }
          }
        })
        .state('projects.detail', {
          url: '/:projectId',
          templateUrl: 'partials/projects/detail.html',
          controller: 'ProjectController',
          controllerAs: 'projectController',
          resolve: {
            project: function (Projects, $stateParams, projects) {

              return Projects.find($stateParams.projectId);
            }
          }
        })
        .state('projects.detail.edit', {
          url: '/edit',
          templateUrl: 'partials/projects/edit.html',
          controller: 'ProjectEditController',
          controllerAs: 'projectEditController'
        });
    });
}());