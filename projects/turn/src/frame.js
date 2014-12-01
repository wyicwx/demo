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
		page.addEventListener('touchcancel', touchEnd.bind(self));

		page.addEventListener('mousedown', touchStart.bind(self));
		page.addEventListener('mousemove', touchMove.bind(self));
		page.addEventListener('mouseup', touchEnd.bind(self));
	}

	function touchStart(e) {
		e.preventDefault();
		var info = this.animateInfo;
		// 回复状态
		if(info.homing) return;

		var pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

		info.start = true;
		info.startY = info.prevY = pageY;
		
		if(this.debug) {
			console.log('starY:'+info.startY);
		}

		var page = this.pages.indexOf(e.target);
		var prev = this.pages[page-1];
		var next = this.pages[page+1];

		if(prev) {
			prev.style.zIndex = ++info.zIndex;
		}
		if(next) {
			next.style.zIndex = ++info.zIndex;
		}
	}

	function touchMove(e) {
		e.preventDefault();
		var info = this.animateInfo;

		if(!info.start || info.homing) return;


		var edgeY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
		var diff = Math.abs(edgeY - info.prevY);
		var pageDiff = Math.abs(edgeY - info.startY);
		var page = this.pages.indexOf(e.target);
		var direction = edgeY > info.startY ? 'down' : 'up';
		var next = direction == 'down' ? this.pages[page-1] : this.pages[page+1];
		var curr = e.target;

		info.prevY = edgeY;

		if(this.debug) {
			console.log('direction:', direction);
			console.log('edgeY:', edgeY);
			console.log('next:', next);
			console.log('diff:', diff);
			console.log('pageDiff:', pageDiff);
		}

		this.model.sliding(curr, next, {
			direction: direction,
			diff: diff,
			pageDiff: pageDiff,
			edgeY: edgeY
		});
	}

	function touchEnd(e) {
		e.preventDefault();
return;
		var info = this.animateInfo;

		info.start = false;
		if(info.homing) return;
		if(!dom || !next) return;

		homing = true;
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
				homing = false;
			}, 300);
		});
	};

	function Frame(el, config) {
		this.element = el;
		this.elementInfo = {
			height: el.offsetHeight,
			width: el.offsetWidth
		};
		this.animateInfo = {
			// 归位
			homing: false,
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

		this.initialize(el, config);
	}

	Frame.prototype = {
		debug: false,
		Model: Model,
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
		initialize: function(el, config) {
			config || (config = {});
			this.model = config.model || (new this.Model());

			this.model.parentInfo = this.elementInfo;
		}
	};

	Frame.extend = extend;

	var elementStyle = document.createElement('div').style;
	function _vendor() {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for (; i < l; i++) {
			transform = vendors[i] + 'ransform';
			if (transform in elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
		}
		return false;
	};


	function Model() {
		this.initialize();
	}

	Model.prototype = {
		sliding: function(curr, next, info) {			
		},
		recover: function() {
		},
		prefixStyle: function(style) {
			if (_vendor() === false) return false;
			if (_vendor() === '') return style;
			return _vendor() + style.charAt(0).toUpperCase() + style.substr(1);
		},
		initialize: function() {}
	}

	Model.extend = extend;


	return {
		Frame: Frame,
		Model: Model
	}
});