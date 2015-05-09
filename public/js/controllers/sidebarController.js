var showChilds = function (e) {
	this.hideChilds();
	this[e+'smenu'] = !this[e+'smenu'];
	this.clicked = !this.clicked;
};

var hideChilds = function() {
	for(var element in this) {
		console.log(element);
		if (element.indexOf('smenu') > -1) {element = false;}
	}
};

function SidebarCtrl ($scope, $parse) {
	this.rhsmenu = false;
	this.clicked = false;
	
	this.showChilds = showChilds;
	this.hideChilds = hideChilds;
}

armentum.controller('SidebarCtrl', SidebarCtrl);