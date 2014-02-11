
(function() {

  angular.module('MyApp', [])
    
    .directive('wallopSlider', function () {
        return {
          template: '<div class="wallop-slider {{animationClass}}"><ul class="wallop-slider__list"><li class="wallop-slider__item {{itemClasses[$index]}}" ng-repeat="i in images"><img src="{{i}}"></li></ul><button ng-show="images.length>1" class="wallop-slider__btn wallop-slider__btn--previous btn btn--previous" ng-disabled="prevDisabled" ng-click="onPrevButtonClicked()">Previous</button><button ng-show="images.length>1" class="wallop-slider__btn wallop-slider__btn--next btn btn--next" ng-disabled="nextDisabled" ng-click="onNextButtonClicked()">Next</button></div>',
          restrict: 'EA',
          transclude: true,
          replace: false,
          scope: {
            images: '=',
            animation: '@',
            currentItemIndex: '=',
            onNext: '&',
            onPrevious: '&'
          },
          controller: function($scope, $timeout) {

            $scope.itemClasses = [];

            $scope.$watch('images', function(images) {
              if (images.length) {
                _goTo(0);
              }
            });

            // set animation class corresponding to animation defined in CSS. e.g. rotate, slide
            if ($scope.animation) {
              $scope.animationClass = 'wallop-slider--' + $scope.animation;
            }

            var _displayOptions = {
              btnPreviousClass: 'wallop-slider__btn--previous',
              btnNextClass: 'wallop-slider__btn--next',
              itemClass: 'wallop-slider__item',
              currentItemClass: 'wallop-slider__item--current',
              showPreviousClass: 'wallop-slider__item--show-previous',
              showNextClass: 'wallop-slider__item--show-next',
              hidePreviousClass: 'wallop-slider__item--hide-previous',
              hideNextClass: 'wallop-slider__item--hide-next'
            };

            function updateClasses() {
              if ($scope.itemClasses.length !== $scope.images.length) {
                $scope.itemClasses = [];
                for (var i=0; i<$scope.images.length; i++) {
                  $scope.itemClasses.push('');
                }
              }
            }
            function _nextDisabled() {
              return ($scope.currentItemIndex + 1) === $scope.images.length;
            }
            function _prevDisabled() {
              return !$scope.currentItemIndex;
            }
            function _updatePagination() {
              $scope.nextDisabled = _nextDisabled();
              $scope.prevDisabled = _prevDisabled();
            }
            function _clearClasses() {
              for (var i=0; i<$scope.images.length; i++) {
                $scope.itemClasses[i] = '';
              }

            }

            // go to slide
            function _goTo(index) {
              if (index >= $scope.images.length || index < 0 || index === $scope.currentItemIndex) {

                if (!index) {
                  $scope.itemClasses[0] = _displayOptions.currentItemClass;
                }
                return;
              }

              _clearClasses();

              $scope.itemClasses[$scope.currentItemIndex] = (index > $scope.currentItemIndex) ? _displayOptions.hidePreviousClass : _displayOptions.hideNextClass;

              var currentClass = (index > $scope.currentItemIndex) ? _displayOptions.showNextClass : _displayOptions.showPreviousClass;
              $scope.itemClasses[index] = _displayOptions.currentItemClass + ' ' + currentClass;

              $scope.currentItemIndex = index;

              _updatePagination();

            }

            // button event handlers
            // consider using the ng-tap directive to remove delay
            $scope.onPrevButtonClicked = function () {
              _goTo($scope.currentItemIndex - 1);
            };
            $scope.onNextButtonClicked = function () {
              _goTo($scope.currentItemIndex + 1);
            };
            
            $scope.$watch('currentItemIndex', function(newVal, oldVal) {
              if (oldVal > newVal) {
                if (typeof $scope.onPrevious === 'function') {
                  $scope.onPrevious();
                }
              } else {
                if (typeof $scope.onNext === 'function') {
                  $scope.onNext();
                }
              }
            });

          }
        };
    });

})();