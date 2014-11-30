define(['../helper/extendClass.js'], function(extend) {
	function _createPage(self) {
		self.pageTemplates.forEach(function(html, index) {
			var page = document.createElement('div');

			page.style.cssText = 'position:absolute; top: 0;left: 0;right: 0;bottom: 0;';
			page.style.zIndex = self.pageTemplates.length - index;
			page.style.visibility = index === 0 ? 'visible' : 'hidden';
			page.className = 'frame_page';
			page.innerHTML = html;

			_bindEvent(self, page);

			self.pages.push(page);
			self.element.appendChild(page);
		}, self);
	}

	function _bindEvent(self, page) {
		page.addEventListener('touchstart', touchStart.bind(self));
		page.addEventListener('touchmove', touchMove.bind(self));
		page.addEventListener('touchend', touchEnd.bind(self));


		
		page.addEventListener('mousedown', touchStart.bind(self));
		page.addEventListener('mousemove', touchMove.bind(self));
		page.addEventListener('mouseup', touchEnd.bind(self));
	}

	function touchStart(e) {
		e.preventDefault();
		var info = this.animateInfo;

		if(info.stoping) return;

		var pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

		info.start = true;
		info.startY = info.prevY = pageY;
		
		debugger;
		diff = false;
		dom = false;
		next = false;
		prevY = false;
		$(this).prev().css('z-index', zIndex++);
		$(this).next().css('z-index', zIndex++);
	}

	function touchMove(e) {
		e.preventDefault();
		var info = this.animateInfo;

		if(!info.start || info.stoping) return;


		var edgeY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
		var page = Number($(this).data('page'))+1;

		dom = $(this);

		diff = Math.abs(edgeY - (prevY || startY));
		if(diff > wH) return;
		// true 下, false 上
		direction = edgeY > startY;

		if(direction) { // 往下
			if(page <= 1) {
				dom = null;
				return;
			}
			next = dom.prev();
			var style = next[0].style;
		} else {
			if(page >= totalPage) {
				dom = null;
				return;
			}
			next = dom.next();
			var style = next[0].style;
		}
		var translateZ = 'scale('+(1-0.2*diff/wH)+')';
		next.removeClass('hide');
		var moveDiff = diff * 0.6;
		if(!direction) {
			dom[0].style[prefixStyle('transform')] = 'translate(0,' + -moveDiff + 'px) ' + translateZ;
			style[prefixStyle('transform')] = 'translate(0,' + (wH - diff) + 'px) scale(1)';
		} else {
			dom[0].style[prefixStyle('transform')] = 'translate(0,' + moveDiff + 'px) ' + translateZ;
			style[prefixStyle('transform')] = 'translate(0,' + (-wH + diff) + 'px) scale(1)';
		}
		prevY = startY;
	};

	function touchEnd(e) {
		e.preventDefault();

		var info = this.animateInfo;

		if(info.stoping) return;
		if(!dom || !next) return;

		stoping = true;
		next.addClass('animated');
		dom.addClass('animated');
		var after;

		if(direction) {
			if((Number(dom.data('page'))+1) <= 1) {
				var restore = true;
			}
		} else {
			if((Number(dom.data('page'))+1) >= totalPage) {
				var restore = true;
			}
		}
		if(diff/wH > 0.4 && !restore) { // change
			if(direction) {
				next[0].style[prefixStyle('transform')] = 'translate(0, 0px) scale(1)';
				dom[0].style[prefixStyle('transform')] = 'translate(0, '+wH*0.6+'px) scale(0.8)';
			} else {
				next[0].style[prefixStyle('transform')] = 'translate(0, 0px) scale(1)';
				dom[0].style[prefixStyle('transform')] = 'translate(0, '+ -wH*0.6 +'px) scale(0.8)';
			}
			after = function() {
				dom.addClass('hide');
				next.addClass('showtime');
			}
		} else { // restore
			if(direction) {
				dom[0].style[prefixStyle('transform')] = 'translate(0, 0px) scale(1)';
				if(restore) {
					next[0].style[prefixStyle('transform')] = 'translate(0, '+ wH +'px) scale(1)';
				} else {
					next[0].style[prefixStyle('transform')] = 'translate(0, '+ -wH +'px) scale(1)';
				}
			} else {
				dom[0].style[prefixStyle('transform')] = 'translate(0, 0px) scale(1)';
				if(restore) {
					next[0].style[prefixStyle('transform')] = 'translate(0, '+ -wH +'px) scale(1)';
				} else {
					next[0].style[prefixStyle('transform')] = 'translate(0, '+ wH +'px) scale(1)';
				}
			}
			after = function() {
				next.addClass('hide');
			}
		}
		requestAnimationFrame(function() {
			setTimeout(function() {
				next.removeClass('animated');
				dom.removeClass('animated');
				after();
				dom = null;
				next = null;
				stoping = false;
			}, 300);
		});
	};

	function Frame(el) {
		this.element = el;
		this.elementInfo = {
			height: el.offsetHeight,
			width: el.offsetWidth
		};
		this.animateInfo = {
			// 归位
			stoping: false,
			// 初始z-index值
			zIndex: this.pageTemplates.length,
			// 手指/鼠标触发的初始位置
			startY: 0 ,
			// 移动过程中上一次的位置
			prevY: 0,
			// 触摸开始
			start: false
		}

		_createPage(this);
	}

	Frame.prototype = {
		mode: Model,
		pageTemplates: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9'
		],
		pages: [],
	};

	Frame.extend = extend;

	function Model() {

	}

	Model.extend = extend;

	return {
		Frame: Frame
	}
});