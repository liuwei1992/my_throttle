/**
 *
 * @param {function} func  需要执行的函数
 * @param {number} interval  间隔时间
 * @param {{leading = true, trailing = false}} param2 首次是否执行,末次是否执行
 * @returns
 */
function throttle(
  func,
  interval = 0,
  { leading = true, trailing = false } = {},
) {
  if (typeof func !== 'function') throw new Error('请传入函数')

  let execTime = 0
  let timer

  function clearTimer() {
    if (timer) clearTimeout(timer)
  }

  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        const nowTime = new Date().getTime()

        // 首次不执行
        if (!leading && execTime == 0) {
          execTime = nowTime + interval
          return
        }

        // 中间不执行
        if (execTime > nowTime) {
          // 末尾执行
          if (trailing) {
            clearTimer()

            timer = setTimeout(() => {
              const result = func.apply(this, args)
              resolve(result)
              timer = null
            }, interval)
          }

          return
        }

        execTime = nowTime + interval

        clearTimer()
        const result = func.apply(this, args)
        resolve(result)
      } catch (err) {
        reject(err)
        timer = null
      }
    })
  }

  _throttle.cancel = () => {
    clearTimer()
    timer = null
    execTime = 0
  }

  return _throttle
}

export default throttle
