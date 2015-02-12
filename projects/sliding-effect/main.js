(function() {
	// include('~/common/requestAnimationFrame/requestAnimationFrame.js')
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
