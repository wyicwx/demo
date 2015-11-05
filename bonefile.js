var bone = require('bone');
var path = require('path');
var fs = require('fs');
var connect = require('bone-cli-connect');
var less = require('bone-act-less');
var layout = require('bone-act-layout');
var include = require('bone-act-include');

// common
var common = bone.dest('common');

common.dest('css3')
	.src('./fn.less')
	.act(include)
	.act(less)
	.rename('css3.css');

bone.dest('dist')
	.src('~/projects/**/*')
	.act(include);

bone.project('dist', '~/dist/**/*');

bone.task('release', function() {
	bone.fs.rm('~/dist');
},{
	name: 'build',
	params: {
		'project': 'dist'
	}
});
// cli
bone.cli(connect({
	base: './',
	port: 8081,
	livereload: true
}));
