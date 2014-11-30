var bone = require('bone');
var connect = require('bone-connect');

var dist = bone.dest('dist');

var turn = dist.dest('turn');

turn.src('~/projects/turn/src/**/*');

turn.src('~/projects/turn/*.html');

dist.dest('helper')
	.src('~/projects/helper/*');


bone.cli(connect({base: './dist'}));

