(function() {
	var lastTime = 0,
	vendors = ['ms', 'moz', 'webkit', 'o']
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
	window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime(),
			timeToCall = Math.max(0, 16 - (currTime - lastTime)),
			id = window.setTimeout(function() {
				callback(currTime + timeToCall)
			}, timeToCall)
		lastTime = currTime + timeToCall
		return id
	};
}

if (!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id)
	}
}
	var mask = document.querySelector('.charbg');
	var height = mask.offsetHeight;
	var offset = 0;
	var getGradient = function() {
		var gradient = '-webkit-gradient(radial, '+offset+'% '+height/2+', 5, '+offset+'% '+height/2+', 40, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));';
		offset++;
		if(offset > 100) {
			offset = 0;
		}
		return gradient;
	};

	mask.style.cssText = ['opacity:1', '-webkit-mask:'+getGradient()].join(';');

	var animate = function() {
		requestAnimationFrame(function() {
			mask.style.cssText = ['opacity:1', '-webkit-mask:'+getGradient()].join(';');
			animate();
		});
	}

	animate();
})();
