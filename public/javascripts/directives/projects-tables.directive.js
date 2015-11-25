(function () {

  'use strict';

  angular.module('app.ui')
    .directive('projectsTable', function () {
      return {
        restrict: 'EA',
        templateUrl: 'partials/directives/project-table.html',
        scope: {
          projects: '=',
          remove: '='
        }
      };
    });
}());