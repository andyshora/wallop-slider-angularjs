# Wallop Slider in AngularJS
An implementation of [@peduarte's Wallop Slider](http://www.pedroduarte.me/wallop-slider/) as an AngularJS Directive.

## Standalone Demo
You can view a standalone demo of the directive in action on [JS Bin](http://jsbin.com/yiyec/6/edit).

## Properties
- *images* (Array) An array of image Urls (required)
- *animation* (string) An animation defined in CSS, for example corresponding to one of the [CSS selector names here](https://github.com/peduarte/wallop-slider/tree/master/css) e.g. rotate
- *current-item-index* (number) A number bound to the current item index being shown by the slider
- *on-previous* (function) A function which gets executed when the slider transitions to the previous slide
- *on-next* (function) A function which gets executed when the slider transitions to the next slide