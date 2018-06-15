import preBuildFnalTest from './src'
import postBuildFnalTest from './index'

fnalPipeTests('pre', preBuildFnalTest)
fnalPipeTests('post', postBuildFnalTest)

function fnalPipeTests (name, fnalPipe) {
  test(`${name} build - only sync methods`, () => {
    const sum2 = value => value + 2
    const double = value => value * 2

    execSyncTest(sum2, sum2)(0)(4)(fnalPipe)
    execSyncTest(double, sum2)(3)(8)(fnalPipe)
    execSyncTest(sum2, double)(3)(10)(fnalPipe)
    execSyncTest(sum2, sum2, sum2, sum2, double, sum2, sum2, sum2)(0)(22)(fnalPipe)
  })

  test(`${name} build - with at least one async method`, async () => {
    const sum2 = value => value + 2
    const double = value => Promise.resolve(value * 2)

    await execAsyncTest(sum2, sum2)(0)(4)(fnalPipe)
    await execAsyncTest(double, sum2)(3)(8)(fnalPipe)
    await execAsyncTest(sum2, double)(3)(10)(fnalPipe)
    await execAsyncTest(sum2, sum2, sum2, sum2, double, sum2, sum2, sum2)(0)(22)(fnalPipe)
    return fnalPipe(sum2, double)(0)
      .then(result => expect(result).toBe(4))
  })

}

function execSyncTest (...params) {
  return firstArg => expectedResult => fnalPipe => {
    expect(fnalPipe(...params)(firstArg)).toBe(expectedResult)
    expect(fnalPipe(firstArg, ...params)).toBe(expectedResult)
  }
}

function execAsyncTest (...params) {
  return firstArg => expectedResult => async fnalPipe => {
    expect(await fnalPipe(...params)(firstArg)).toBe(expectedResult)
    expect(await fnalPipe(firstArg, ...params)).toBe(expectedResult)
  }
}
