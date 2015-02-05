define(['./src/meteor.js'], function(Meteor) {
	var canvas = document.getElementById('meteor');
	var meteor = new Meteor(canvas);
	meteor.start();
});