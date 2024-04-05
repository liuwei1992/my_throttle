import throttle from '../lib/index.js'

const test = throttle(
  (e) => {
    console.log('throttle', e.clientX, e.clientY)
    // console.log('args', args)
    return 'hahahah'
  },
  2000,
  { trailing: true },
)

const div = document.querySelector('.div')

div.onpointermove = test

document.querySelector('#cancel').onclick = function () {
  test.cancel()
}

test({ clientX: 0, clientY: 0 }).then((value) =>
  console.log('9090909090', value),
)
