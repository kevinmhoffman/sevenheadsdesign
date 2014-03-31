//FastClick
function FastClick(layer){'use strict';var oldOnClick,self=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=layer;if(!layer||!layer.nodeType){throw new TypeError('Layer must be a document node');}
this.onClick=function(){return FastClick.prototype.onClick.apply(self,arguments);};this.onMouse=function(){return FastClick.prototype.onMouse.apply(self,arguments);};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(self,arguments);};this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(self,arguments);};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(self,arguments);};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(self,arguments);};if(FastClick.notNeeded(layer)){return;}
if(this.deviceIsAndroid){layer.addEventListener('mouseover',this.onMouse,true);layer.addEventListener('mousedown',this.onMouse,true);layer.addEventListener('mouseup',this.onMouse,true);}
layer.addEventListener('click',this.onClick,true);layer.addEventListener('touchstart',this.onTouchStart,false);layer.addEventListener('touchmove',this.onTouchMove,false);layer.addEventListener('touchend',this.onTouchEnd,false);layer.addEventListener('touchcancel',this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==='click'){rmv.call(layer,type,callback.hijacked||callback,capture);}else{rmv.call(layer,type,callback,capture);}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==='click'){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event);}}),capture);}else{adv.call(layer,type,callback,capture);}};}
if(typeof layer.onclick==='function'){oldOnClick=layer.onclick;layer.addEventListener('click',function(event){oldOnClick(event);},false);layer.onclick=null;}}
FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf('Android')>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);FastClick.prototype.needsClick=function(target){'use strict';switch(target.nodeName.toLowerCase()){case'button':case'select':case'textarea':if(target.disabled){return true;}
break;case'input':if((this.deviceIsIOS&&target.type==='file')||target.disabled){return true;}
break;case'label':case'video':return true;}
return(/\bneedsclick\b/).test(target.className);};FastClick.prototype.needsFocus=function(target){'use strict';switch(target.nodeName.toLowerCase()){case'textarea':return true;case'select':return!this.deviceIsAndroid;case'input':switch(target.type){case'button':case'checkbox':case'file':case'image':case'radio':case'submit':return false;}
return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/).test(target.className);}};FastClick.prototype.sendClick=function(targetElement,event){'use strict';var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur();}
touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents');clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent);};FastClick.prototype.determineEventType=function(targetElement){'use strict';if(this.deviceIsAndroid&&targetElement.tagName.toLowerCase()==='select'){return'mousedown';}
return'click';};FastClick.prototype.focus=function(targetElement){'use strict';var length;if(this.deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf('date')!==0&&targetElement.type!=='time'){length=targetElement.value.length;targetElement.setSelectionRange(length,length);}else{targetElement.focus();}};FastClick.prototype.updateScrollParent=function(targetElement){'use strict';var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break;}
parentElement=parentElement.parentElement;}while(parentElement);}
if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop;}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){'use strict';if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode;}
return eventTarget;};FastClick.prototype.onTouchStart=function(event){'use strict';var targetElement,touch,selection;if(event.targetTouches.length>1){return true;}
targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(this.deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true;}
if(!this.deviceIsIOS4){if(touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false;}
this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement);}}
this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime)<200){event.preventDefault();}
return true;};FastClick.prototype.touchHasMoved=function(event){'use strict';var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true;}
return false;};FastClick.prototype.onTouchMove=function(event){'use strict';if(!this.trackingClick){return true;}
if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null;}
return true;};FastClick.prototype.findControl=function(labelElement){'use strict';if(labelElement.control!==undefined){return labelElement.control;}
if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor);}
return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');};FastClick.prototype.onTouchEnd=function(event){'use strict';var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true;}
if((event.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;return true;}
this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent;}
targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==='label'){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(this.deviceIsAndroid){return false;}
targetElement=forElement;}}else if(this.needsFocus(targetElement)){if((event.timeStamp-trackingClickStart)>100||(this.deviceIsIOS&&window.top!==window&&targetTagName==='input')){this.targetElement=null;return false;}
this.focus(targetElement);if(!this.deviceIsIOS4||targetTagName!=='select'){this.targetElement=null;event.preventDefault();}
return false;}
if(this.deviceIsIOS&&!this.deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true;}}
if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event);}
return false;};FastClick.prototype.onTouchCancel=function(){'use strict';this.trackingClick=false;this.targetElement=null;};FastClick.prototype.onMouse=function(event){'use strict';if(!this.targetElement){return true;}
if(event.forwardedTouchEvent){return true;}
if(!event.cancelable){return true;}
if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation();}else{event.propagationStopped=true;}
event.stopPropagation();event.preventDefault();return false;}
return true;};FastClick.prototype.onClick=function(event){'use strict';var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true;}
if(event.target.type==='submit'&&event.detail===0){return true;}
permitted=this.onMouse(event);if(!permitted){this.targetElement=null;}
return permitted;};FastClick.prototype.destroy=function(){'use strict';var layer=this.layer;if(this.deviceIsAndroid){layer.removeEventListener('mouseover',this.onMouse,true);layer.removeEventListener('mousedown',this.onMouse,true);layer.removeEventListener('mouseup',this.onMouse,true);}
layer.removeEventListener('click',this.onClick,true);layer.removeEventListener('touchstart',this.onTouchStart,false);layer.removeEventListener('touchmove',this.onTouchMove,false);layer.removeEventListener('touchend',this.onTouchEnd,false);layer.removeEventListener('touchcancel',this.onTouchCancel,false);};FastClick.notNeeded=function(layer){'use strict';var metaViewport;if(typeof window.ontouchstart==='undefined'){return true;}
if((/Chrome\/[0-9]+/).test(navigator.userAgent)){if(FastClick.prototype.deviceIsAndroid){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport&&metaViewport.content.indexOf('user-scalable=no')!==-1){return true;}}else{return true;}}
if(layer.style.msTouchAction==='none'){return true;}
return false;};FastClick.attach=function(layer){'use strict';return new FastClick(layer);};if(typeof define!=='undefined'&&define.amd){define(function(){'use strict';return FastClick;});}else if(typeof module!=='undefined'&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick;}else{window.FastClick=FastClick;}
/*!! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */(function(w){"use strict";w.picturefill=function(){var ps=w.document.getElementsByTagName("span");for(var i=0,il=ps.length;i<il;i++){if(ps[i].getAttribute("data-picture")!==null){var sources=ps[i].getElementsByTagName("span"),matches=[];for(var j=0,jl=sources.length;j<jl;j++){var media=sources[j].getAttribute("data-media");if(!media||(w.matchMedia&&w.matchMedia(media).matches)){matches.push(sources[j]);}}
var picImg=ps[i].getElementsByTagName("img")[0];if(matches.length){var matchedEl=matches.pop();if(!picImg||picImg.parentNode.nodeName==="NOSCRIPT"){picImg=w.document.createElement("img");picImg.alt=ps[i].getAttribute("data-alt");}
else if(matchedEl===picImg.parentNode){continue;}
picImg.src=matchedEl.getAttribute("data-src");matchedEl.appendChild(picImg);picImg.removeAttribute("width");picImg.removeAttribute("height");}
else if(picImg){picImg.parentNode.removeChild(picImg);}}}};if(w.addEventListener){w.addEventListener("resize",w.picturefill,false);w.addEventListener("DOMContentLoaded",function(){w.picturefill();w.removeEventListener("load",w.picturefill,false);},false);w.addEventListener("load",w.picturefill,false);}
else if(w.attachEvent){w.attachEvent("onload",w.picturefill);}}(this));

// Quick IE8 shiv
if( !window.addEventListener ){
	window.addEventListener = function( evt, cb ){
		return w.attachEvent( "on" + evt, cb );
	};
}


window.addEventListener('load', function() {
	FastClick.attach(document.body);
});

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



//Nav 

var toggle = document.getElementById('toggle'),
	nav = document.getElementById('nav');

toggle.addEventListener('click', function() {
	if (nilla.hasClass(toggle, 'close')) {
		nilla.removeClass(toggle, 'close');
		nilla.removeClass(nav, 'active');
	} else {
		nilla.addClass(toggle, 'close');
		nilla.addClass(nav, 'active');
	}
	return false;
});


//Form
var reasons = document.getElementById('reason');

reasons.addEventListener('change', function(){
	if (reasons.value !== '') {
		nilla.addClass(reasons, 'filled');
	}
});