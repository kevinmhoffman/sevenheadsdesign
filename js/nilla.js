// Quick IE8 shiv
if( !window.addEventListener ){
	window.addEventListener = function( evt, cb ){
		return w.attachEvent( "on" + evt, cb );
	};
}
var nilla = window.nilla || {
	cache: {}
};

//now add in the modules you need

//check for classList support
nilla.classList = document.documentElement.classList;

// check if an element has a class
nilla.hasClass = function(elem, className) {
	if ( nilla.classList ) {
		return elem.classList.contains(className);
	} else {
		return RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
	}
};

//add a class to an element
nilla.addClass = function(elem, className) {
	if ( !nilla.hasClass(elem, className) ) {
		if ( nilla.classList ) {
				elem.classList.add(className);
		} else {
			elem.className += (elem.className ? ' ' : '') + className;
		}
	}
};

//remove a class from an element
nilla.removeClass = function(elem, className) {
	if ( nilla.hasClass(elem, className) ) {
		if ( nilla.classList ) {
			elem.classList.remove(className);
		} else {
			elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
		}
	}
};

//toggle a class on an element
nilla.toggleClass = function(elem, className) {
	if ( nilla.classList ) {
		elem.classList.toggle( className );
	} else {
		if ( nilla.hasClass(elem, className) ) {
			nilla.removeClass(elem, className);
		} else {
			nilla.addClass(elem, className);
		}
	}
};
