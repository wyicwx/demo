define(['./src/frame.js', './src/module/shutter.js'], function(frame, Shutter) {

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