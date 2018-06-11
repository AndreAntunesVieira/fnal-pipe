import preBuildFnalTest from './src'
import postBuildFnalTest from './index'

fnalPipeTests('pre', preBuildFnalTest)
fnalPipeTests('post', postBuildFnalTest)

function fnalPipeTests (name, fnalPipe) {
  test(`${name} build - only sync methods`, () => {
    const sum2 = value => value + 2
    const double = value => value * 2

    expect(fnalPipe(sum2, sum2)(0)).toBe(4)
    expect(fnalPipe(double, sum2)(3)).toBe(8)
    expect(fnalPipe(sum2, double)(3)).toBe(10)
    expect(fnalPipe(sum2, sum2, sum2, sum2, double, sum2, sum2, sum2)(0)).toBe(22)
  })

  test(`${name} build - with at least one async method`, async () => {
    const sum2 = value => value + 2
    const double = value => Promise.resolve(value * 2)

    expect(await fnalPipe(sum2, sum2)(0)).toBe(4)
    expect(await fnalPipe(double, sum2)(3)).toBe(8)
    expect(await fnalPipe(sum2, double)(3)).toBe(10)
    expect(await fnalPipe(sum2, sum2, sum2, sum2, double, sum2, sum2, sum2)(0)).toBe(22)

    return fnalPipe(sum2, double)(0)
      .then(result => expect(result).toBe(4))
  })

}
