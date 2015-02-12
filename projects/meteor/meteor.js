define(['./extend.js', './star.js'], function(extend, Star) {

	// include('~/common/requestAnimationFrame/requestAnimationFrame.js')

	function Meteor(canvas, config) {
		this.stars = [];
		this.ctx = canvas.getContext("2d");

		canvas.height = canvas.offsetHeight * window.devicePixelRatio;
		canvas.width = canvas.offsetWidth * window.devicePixelRatio;

		this.initialize(canvas, config);
	}
	Meteor.prototype.status = 'init';
	Meteor.prototype.maxStarNumber = 3;
	Meteor.prototype.Star = Star;
	Meteor.prototype.initialize = function() {};

	Meteor.prototype.start = function() {
		var cur = this.stars.length;
		var max = this.maxStarNumber;

		for(var i = cur; i < max; i++) {
			this.addSingleStar();
		}
		this.run();
	};

	Meteor.prototype.run = function() {
		if(this.status == 'running') {
			return;
		}
		this.status = 'running';
		this.draw();
	};

	Meteor.prototype.draw = function() {
		var self = this;
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.stars.forEach(function(star) {
			star.draw();
		});

		this.RAF = window.requestAnimationFrame(function() {
			self.draw();	
		});
	};

	Meteor.prototype.addSingleStar = function() {
		var star = new this.Star(this.ctx);
		var self = this;

		this.stars.push(star);

		star.onDestroy = function() {
			var index = self.stars.indexOf(this);
			self.stars.splice(index, 1);

			self.start();
		};
	};

	Meteor.prototype.pause = function() {

	};

	Meteor.prototype.stop = function() {

	};

	Meteor.extend = extend;

	return Meteor;
});