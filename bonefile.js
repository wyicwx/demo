var bone = require('bone');
var path = require('path');
var fs = require('fs');

// load sub-project bonefile 
function requireBonefile(folders) {
	folders.forEach(function(folder) {
		var subbonefile = path.join(folder, 'subbonefile.js');
		if(fs.existsSync(subbonefile)) {
			require(subbonefile);
		}
	});
}
var projectsPath = path.resolve('./projects');
var projects = fs.readdirSync(projectsPath).map(function(v) {
	return path.join(projectsPath, v);
});
var commonsPath = path.resolve('./common');
var commons = fs.readdirSync(commonsPath).map(function(v) {
	return path.join(commonsPath, v);
});
requireBonefile(projects);
requireBonefile(commons);

// map ./common to ./project/sub-project/common
projects.forEach(function(project) {
	bone.dest(project)
		.dest('common')
		.src(path.join(commonsPath, '**/*'));
});



var connect = require('bone-connect');
var less = require('bone-less');
var include = require('bone-act-include');



var dist = bone.dest('dist');

// var turn = dist.dest('turn');

// turn.src('~/projects/turn/src/**/*');

// turn.src('~/projects/turn/*.html');

// dist.dest('helper')
// 	.src('~/projects/helper/*');

// var css = dist.dest('css');

// css.src('~/projects/css3/*.less')
// 	.act(include())
// 	.act(less())
// 	.rename(function(filename) {
// 		return filename.replace(/\.less$/, '.css');
// 	});

bone.cli(connect({
	base: './',
	port: 8081
}));

bone.project('dist', '~/projects/**/*');