(function () {
    'use strict';

    angular.module('app')
        .service('navService', [
            '$q',
            navService
        ]);

    function navService($q) {
        var menuItems = [
            {
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            },
            {
                name: 'Profile',
                icon: 'person',
                sref: '.profile'
            },
            {
                name: 'Table',
                icon: 'view_module',
                sref: '.table'
            },
            {
                name: 'Data Table',
                icon: 'view_module',
                sref: '.data-table'
            },
            {
                name: 'Exam',
                icon: 'view_module',
                sref: '.exam'
            },
            {
                name: 'Quiz',
                icon: 'fingerprint',
                sref: '.quiz'
            },
            {
                name: 'My Result',
                icon: 'view_module',
                sref: '.myResult'
            },
            {
                name: 'Student',
                icon: 'assessment',
                sref: '.studentResult'
            }
        ];

        return {
            loadAllItems: function () {
                return $q.when(menuItems);
            }
        };
    }

})();
