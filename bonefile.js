var bone = require('bone');
var path = require('path');
var fs = require('fs');
var connect = require('bone-cli-connect');
var less = require('bone-act-less');
var layout = require('bone-act-layout');
var include = require('bone-act-include');

bone.dest('dist')
	.src('~/projects/**/*')
	.act(include)
	.act(less(null, {
		filter: function(runtime) {
			if(path.extname(runtime.source) == '.less') {
				if(path.extname(runtime.destination) == '.css') {
					return true;
				}
			}
			return false;
		}
	}))
	.rename(function(fileName, filePath) {
		if(filePath.indexOf('lessFunction/fn.less') == -1) {
			return fileName.replace(/\.less$/, '.css');
		} else {
			return fileName;
		}
	});

bone.task('release', {
	name: 'build'
});
bone.cli(require('bone-cli-build')());
// cli
bone.cli(connect({
	base: './dist',
	livereload: true
}));
