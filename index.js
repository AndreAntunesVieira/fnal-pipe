'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fnalPipe;

function fnalPipe (firstMethod) {
  for (var _len = arguments.length, methods = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    methods[_key - 1] = arguments[_key];
  }

  return function (value) {
    if (typeof firstMethod !== 'function') {
      return value;
    }
    var result = firstMethod(value);
    if (result instanceof Promise) {
      return result.then(fnalPipe.apply(undefined, methods));
    }
    return fnalPipe.apply(undefined, methods)(result);
  };
}
