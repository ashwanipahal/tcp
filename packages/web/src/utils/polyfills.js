import '@babel/polyfill';
// (function map(fun, thisp) {
// 	if (this === void 0 || this === null) {
// 		throw new TypeError();
// 	}
// 	const t = Object(this);
// 	const len = t.length >>> 0;
// 	if (typeof fun !== "function") {
// 		throw new TypeError();
// 	}
// 	const res = [ ];
// 	for (const i = 0; i < len; i++) {
// 		if (i in t) {
// 			const val = t[i]; // in case fun mutates this
// 			res[i] = thisp ? fun.call(thisp, val, i, t) : fun(val, i, t);
// 		}
// 	}
// 	return res;
// })()

// import './polyfills/closest';
// (function polyfill(window) {
// 	const ElementPrototype = window.Element.prototype;
// 	if (typeof ElementPrototype.closest !== 'function') {
// 		ElementPrototype.closest = function closest(selector) {
// 			let element = this;

// 			while (element && element.nodeType === 1) {
// 				if (element.matches(selector)) {
// 					return element;
// 				}

// 				element = element.parentNode;
// 			}

// 			return null;
// 		};
// 	}
// })(window);
