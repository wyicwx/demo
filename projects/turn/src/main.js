require(['./frame.js'], function(frame) {

	var Shutter = frame.Model.extend({
		sliding: function(curr, next, info) {
			var wH = this.parentInfo.height;
			var translateZ = 'scale('+(1-0.2*info.diff/wH)+')';
			// next.removeClass('hide');
			var moveDiff = info.pageDiff * 0.6;
			var diff = info.pageDiff;
			if(info.direction == 'up') {
				curr.style[this.prefixStyle('transform')] = 'translate(0,' + -moveDiff + 'px) ' + translateZ;
				if(next) {
					next.style[this.prefixStyle('transform')] = 'translate(0,' + (wH - diff) + 'px) scale(1)';
				}
			} else {
				curr.style[this.prefixStyle('transform')] = 'translate(0,' + moveDiff + 'px) ' + translateZ;
				if(next) {
					next.style[this.prefixStyle('transform')] = 'translate(0,' + (-wH + diff) + 'px) scale(1)';
				}
			}
		}
	});

	var slider = document.getElementById('slider');
	var fra = new frame.Frame(slider, {
		model: new Shutter()
	});
	fra.debug = true;
});