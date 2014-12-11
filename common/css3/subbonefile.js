var bone = require('bone');
var less = require('bone-less');
var include = require('bone-include');


var css3 = bone.dest('~/common/css3');


css3.src('./animate.less')
	.act(include)
	.act(less)
	.rename('animate.css');

