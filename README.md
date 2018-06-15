# fnal-pipe
Part of a series of `f`unctio`nal` helpers:

## Installation
```bash
yarn add fnal-pipe 
```
or
```bash
npm install fnal-pipe
```

## Use

### import / require

```js
// With >= ES6
import fnalPipe from 'fnal-pipe'
```
```js
// With <= ES5
var fnalPipe = require('fnal-pipe').default
```

### Syntax
`IMPORTANT! All methods can be sync or async, will works \o/`

If at least one method is async, the result will be a `Promise`
Default use
```js
const result = fnalPipe(
  initialValue,
  method1,
  method2,
  method3,
  // all the arguments you want
)
```
Using Curring
```js
const result = fnalPipe(
  method1,
  method2,
  method3,
  // all the arguments you want
)(initialValue)
```


Will implements:

```js
const result = method3(method2(method1(initialValue)))
```
or (more readble)
```js
const temp1 = method1(initialValue)
const temp2 = method2(temp1)
const result = method3(temp2)
```

### Samples


```js
let result
const sum2 = value => value + 2
const double = value => value * 2

// (3 * 2) + 2 = 8
result = fnalPipe(
  3,
  double,
  sum2,
)
// result = 8

// (3 + 2) * 2 = 10
result = fnalPipe(
  3,
  sum2,
  double,
)
// result = 10

// (((3 + 2) + 2) + 2) = 9
result = fnalPipe(
  3,
  sum2,
  sum2,
  sum2,
)
// result = 9
```

With async methods
```js
const sum2 = value => value + 2
const square = value => Promise.resolve(value * value)
// (3 + 2) ^ 2 = 25
const result = await fnalPipe(
  3,
  sum2,
  square,
) // result = 25 after all promises be resolved
```
With async methods inline (Promise syntax)
```js
// (2 + 1) ^ 3 = 27
fnalPipe(
  2,
  lastValue => lastValue + 1, // 2 + 1 = 3
  lastValue => Promise.resolve(lastValue * lastValue * lastValue), // 3 ^ 3 = 27
)
  .then(result => console.log(result))
 // result = 27 after all promises be resolved
```

With inline functions
```js
const initialValue = 5
const result = fnalPipe(
  initialValue,
  lastValue => lastValue + 1,  // 5 + 1 = 6
  lastValue => lastValue * 10, // 6 * 10 = 60
  lastValue => lastValue * lastValue, // 60 * 60 = 3600
)
// result = 3600
```


With async methods inline
```js
const initialValue = 5
const result = await fnalPipe(
  initialValue,
  lastValue => lastValue + 1,  // 5 + 1 = 6
  lastValue => Promise.resolve(lastValue * 10), // 6 * 10 = 60
  lastValue => lastValue * lastValue, // 60 * 60 = 3600
) //result = 3600 after all promises be resolved
```

With ES5
```js
const initialValue = 5
fnalPipe(
  initialValue,
  lastValue => lastValue + 1,  // 5 + 1 = 6
  lastValue => Promise.resolve(lastValue * 10), // 6 * 10 = 60
  lastValue => lastValue * lastValue, // 60 * 60 = 3600
)
  .then(result => console.log(result)) //result = 3600 after all promises be resolved
```
