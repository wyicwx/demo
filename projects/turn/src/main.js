require(['./src/frame.js'], function(frame) {

	var Shutter = frame.Model.extend({
		info: null,
		slideStart: function() {
			this.info = null;
		},
		sliding: function(info) {
			var wH = this.parentInfo.height;
			var translateZ = 'scale('+(1-0.2*info.pageDiff/wH)+')';
			// var translateZ = 'scale(1)';
			var moveDiff = info.pageDiff * 0.6;
			var diff = info.pageDiff;
			if(info.direction == 'up') {
				this.transform(this.curr, 'translate(0,' + -moveDiff + 'px) ' + translateZ);
				if(this.next) {
					this.transform(this.next, 'translate(0,' + (wH - diff) + 'px) scale(1)');
				}
			} else {
				this.transform(this.curr, 'translate(0,' + moveDiff + 'px) ' + translateZ);
				if(this.next) {
					this.transform(this.next, 'translate(0,' + (-wH + diff) + 'px) scale(1)');
				}
			}
			this.info = info;
		},
		slideend: function(done) {
			if(!this.info) {
				return done();
			}
			var info = this.info;
			var restore = false;
			var wH = this.parentInfo.height;
			var self = this;
			if(info.direction == 'down' && info.page <= 0) {
				restore = true;
			} else if(info.direction == 'up' && (info.page+1) >= this.parentInfo.total) {
				restore = true;
			} else if(info.pageDiff/wH < 0.4) {
				restore = true;
			}

			this.addClass(this.curr, 'animate');
			if(this.next) {
				this.addClass(this.next, 'animate');
			}


			if(restore) {
				this.transform(this.curr, 'translate(0, 0px) scale(1)');
				if(this.next) {				
					if(info.direction == 'down') {
						this.transform(this.next, 'translate(0, '+ -wH +'px) scale(0.8)');
					} else {
						this.transform(this.next, 'translate(0, '+ wH +'px) scale(0.8)');
					}
				}
			} else {
				this.transform(this.next, 'translate(0, 0px) scale(1)');
				if(info.direction == 'down') {
					this.transform(this.curr, 'translate(0, '+ wH +'px) scale(0.8)');
				} else {
					this.transform(this.curr, 'translate(0, '+ -wH +'px) scale(0.8)');
				}
			}

			requestAnimationFrame(function() {
				setTimeout(function() {
					self.removeClass(self.curr, 'animate');
					if(self.next) {
						self.removeClass(self.next, 'animate');
					}
					done();
				}, 300);
			});
			
		}
	});
	var templates = [];
	var children = document.getElementById('slider').children;
	for(var i = 0; i < children.length; i++) {
		templates.push(children[i]);
	}
	templates = templates.map(function(dom) {
		return dom.innerHTML.trim();
	});

	var slider = document.getElementById('slider');
	var Class = frame.Frame.extend({
		Model: Shutter,
		pageTemplates: templates
	});
	var fra = new Class(slider);
	fra.debug = true;
});