'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fnalPipe;

function fnalPipe (firstMethod) {
  for (var _len = arguments.length, methods = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    methods[_key - 1] = arguments[_key];
  }

  if (typeof firstMethod === 'function') {
    return fnalPipeRecursive.apply(undefined, [firstMethod].concat(methods));
  }
  return fnalPipeRecursive.apply(undefined, methods)(firstMethod);
}

function fnalPipeRecursive (firstMethod) {
  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    methods[_key2 - 1] = arguments[_key2];
  }

  return function (value) {
    if (typeof firstMethod !== 'function') {
      return value;
    }
    var result = firstMethod(value);
    if (result instanceof Promise) {
      return result.then(fnalPipeRecursive.apply(undefined, methods));
    }
    return fnalPipeRecursive.apply(undefined, methods)(result);
  };
}
