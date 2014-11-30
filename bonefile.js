var bone = require('bone');
var connect = require('bone-connect');

bone.dest('dist')
	.src('~/projects/**/*');

bone.cli(connect({base: './dist'}));

