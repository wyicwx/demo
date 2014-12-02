var bone = require('bone');
var connect = require('bone-connect');
var less = require('bone-less');
var include = require('bone-include');


var dist = bone.dest('dist');

var turn = dist.dest('turn');

turn.src('~/projects/turn/src/**/*');

turn.src('~/projects/turn/*.html');

dist.dest('helper')
	.src('~/projects/helper/*');

var css = dist.dest('css');

css.src('~/projects/css3/*.less')
	.act(include())
	.act(less())
	.rename(function(filename) {
		return filename.replace(/\.less$/, '.css');
	});

bone.cli(connect({base: './dist'}));

