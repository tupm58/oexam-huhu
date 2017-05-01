'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies',
        'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'md.data.table', 'cfp.loadingBar'])

    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                      $mdIconProvider, $qProvider, $httpProvider) {
        $qProvider.errorOnUnhandledRejections(false);

        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                abstract: true
            })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.html',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('home.profile', {
                url: '/profile',
                templateUrl: 'app/views/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            })
            .state('home.table', {
                url: '/table',
                controller: 'TableController',
                controllerAs: 'vm',
                templateUrl: 'app/views/table.html',
                data: {
                    title: 'Table'
                }
            })
            .state('home.data-table', {
                url: '/data-table',
                controller: 'DataTableController',
                controllerAs: 'vm',
                templateUrl: 'app/views/data-table.html',
                data: {
                    title: 'Table'
                }
            })
            .state('home.exam', {
                url: '/exam',
                controller: 'ExamController',
                controllerAs: 'vm',
                templateUrl: 'app/views/exam.html',
                data: {
                    title: 'Exam'
                }
            })
            .state('home.examDetail', {
                url: '/exam/:id',
                controller: 'ExamDetailController',
                controllerAs: 'vm',
                templateUrl: 'app/views/examDetail.html',
                data: {
                    title: 'Exam Detail'
                },
                resolve: {
                    initialData: ['examService', '$stateParams', function (examService, $stateParams) {
                        return examService.getExamDetail($stateParams.id)
                            .then(function (response) {
                                return response.data;
                            });
                    }]
                }
            })
            .state('home.quiz', {
                url: '/quiz',
                controller: 'QuizController',
                controllerAs: 'vm',
                templateUrl: 'app/views/quiz.html',
                data: {
                    title: 'Quiz'
                }
            })
            .state('home.quizDetail', {
                url: '/quiz/:id',
                controller: 'QuizDetailController',
                controllerAs: 'vm',
                templateUrl: 'app/views/quizDetail.html',
                data: {
                    title: 'Quiz Detail'
                },
                resolve: {
                    initialData: ['quizService', '$stateParams', function (quizService, $stateParams) {
                        return quizService.getQuizDetail($stateParams.id)
                            .then(function (response) {
                                return response.data;
                            });
                    }]
                }
            })
            .state('home.answer', {
                url: '/answer/:id',
                controller: 'AnswerController',
                controllerAs: 'vm',
                templateUrl: 'app/views/answer.html',
                data: {
                    title: 'Answer Detail'
                },
                resolve: {
                    initialData: ['answerService', '$stateParams', function (answerService, $stateParams) {
                        return answerService.getAnswerDetail($stateParams.id)
                            .then(function (response) {
                                return response.data;
                            }).catch(function (err) {
                                return err;
                            })
                    }]
                }

            })
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'app/views/login.html'
            })
            .state('home.host', {
                url: '/quiz/:id/host/:pin',
                controller: 'HostController',
                controllerAs: 'vm',
                templateUrl: 'app/views/host.html',
                data: {
                    title: 'Host'
                }
            })
            .state('home.player', {
                url: '/player',
                controllerAs: 'vm',
                templateUrl: 'app/views/player-main.html',
                data: {
                    title: 'Player'
                }
            })
            .state('home.playerDetail', {
                url: '/player/:pin',
                controller: 'PlayerController',
                controllerAs: 'vm',
                templateUrl: 'app/views/player.html',
                resolve: {
                    initialData: ['quizService', '$stateParams','$state','$mdToast',
                        function (quizService, $stateParams,$state,$mdToast) {
                        return quizService.checkPinValid($stateParams.pin)
                            .then(function (response) {
                                console.log("pin ok");
                            }).catch(function (err) {
                                console.log("pin sai");

                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('PIN not found!')
                                        .position('bottom right')
                                        .hideDelay(3000)
                                        .toastClass('md-toast-error')
                                );
                                $state.go('home.player');
                            })
                    }]
                },
                data: {
                    title: 'Player Detail'
                }
            })
            .state('home.myResult', {
                url: '/result',
                controller: 'ResultController',
                controllerAs: 'vm',
                templateUrl: 'app/views/myResult.html',
                data: {
                    title: 'My Result'
                }
            })
            .state('home.studentResult', {
                url: '/student-result',
                controller: 'ExamController',
                controllerAs: 'vm',
                templateUrl: 'app/views/myExam.html',
                data: {
                    title: 'My Exam'
                }
            })
            .state('home.studentResultDetail', {
                url: '/student-result/:examId',
                controller: 'ResultController',
                controllerAs: 'vm',
                templateUrl: 'app/views/studentResult.html',
                data: {
                    title: 'Student Result'
                }
            })
            .state('home.studentRoom', {
                url: '/student-result/room/:examId',
                controller: 'StudentController',
                controllerAs: 'vm',
                templateUrl: 'app/views/studentRoom.html',
                data: {
                    title: 'Student Room'
                }
            })

        $urlRouterProvider.otherwise('/dashboard');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default': '600'
            })
            .accentPalette('teal', {
                'default': '500'
            })
            .warnPalette('defaultPrimary');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('defaultPrimary')
            .dark();

        $mdThemingProvider.theme('grey', 'default')
            .primaryPalette('grey');

        $mdThemingProvider.theme('custom', 'default')
            .primaryPalette('defaultPrimary', {
                'hue-1': '50'
            });
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('pink')
            .dark();

        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.definePalette('defaultPrimary', {
            '50': '#FFFFFF',
            '100': 'rgb(255, 198, 197)',
            '200': '#E75753',
            '300': '#E75753',
            '400': '#E75753',
            '500': '#E75753',
            '600': '#E75753',
            '700': '#E75753',
            '800': '#E75753',
            '900': '#E75753',
            'A100': '#E75753',
            'A200': '#E75753',
            'A400': '#E75753',
            'A700': '#E75753'
        });

        $mdIconProvider.icon('user', 'assets/images/user.svg', 64);

        $httpProvider.defaults.headers.get = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.common = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.put = {'Content-Type': 'application/json'};
        $httpProvider.defaults.headers.patch = {'Content-Type': 'application/json'};
        $httpProvider.interceptors.push('httpRequestInterceptor');
    });
