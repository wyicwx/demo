var bone = require('bone');
var path = require('path');
var fs = require('fs');
var connect = require('bone-connect');
var less = require('bone-less');
var include = require('bone-act-include');

// common
var common = bone.dest('common');
common.dest('css3')
	.src('./animate.less')
	.act(include)
	.act(less)
	.rename('animate.css');




// load project 
fs.readdirSync('./projects').map(function(v) {
	var p = path.join(__dirname, 'projects', v, 'bone.js');
	p = path.normalize(p);

	if(fs.existsSync(p)) {
		require(p);
	}
});

bone.dest('dist')
	.src('~/projects/**/*');

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
	port: 8081
}));