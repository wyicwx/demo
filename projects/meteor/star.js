define([], function() {
	function Star(ctx) {
		this.ctx = ctx;
		this.setRandomPosition();
		this.setDelay();
	};

	Star.prototype.x = 0;
	Star.prototype.y = 0;
	Star.prototype.step = 0;
	Star.prototype.length = 80;
	Star.prototype.angle = 30;
	Star.prototype.delay = 0;
	Star.prototype.radius = 2;
	Star.prototype.opacity = 0.8;
	Star.prototype.onDestroy = function() {};
	Star.prototype.draw = function() {
		if(this.delay) {
			this.shine();
			this.delay--;
			return;
		}
		this.move();
	};

	Star.prototype.shine = function() {
		// debugger;
		this.ctx.fillStyle = 'rgba(255, 255, 255, '+(this.opacity-this.delay/this.length)+')';
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0 , 2*Math.PI);
		this.ctx.fill();
	};

	Star.prototype.move = function() {
		var length = Math.min(this.step, this.length);

		for(var i = 0; i < length; i++) {
			var x = this.x - (this.step - i);
			var y = this.y + (this.step - i) * Math.tan(this.angle/180 * Math.PI);

			this.ctx.fillStyle = 'rgba(255, 255, 255, '+(this.opacity-i/length)+')';
			this.ctx.beginPath();
			this.ctx.arc(x, y, this.radius, 0 , 2*Math.PI);
			this.ctx.fill();
		}

		if((x > this.ctx.canvas.width || x < 0) && (y > this.ctx.canvas.height || y < 0)) {
			this.onDestroy();
		} else {
			this.step += 1+this.step/20;
		}
	};

	Star.prototype.setDelay = function() {
		this.delay = Math.floor(Math.random() * this.length);
	};

	Star.prototype.setRandomPosition = function() {
		var width = this.ctx.canvas.width;
		var height = this.ctx.canvas.height;

		this.x = Math.floor(Math.random() * width);
		this.y = Math.floor(Math.random() * height);

		if(this.x < this.ctx.canvas.width/2 || this.y > this.ctx.canvas.height/4) {
			this.setRandomPosition();
		} 
	};

	return Star;
});