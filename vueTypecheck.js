const path = require('path')

const { check } = require('vue-type-check')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  await check({
    workspace: path.resolve(__dirname, './'),
  })
})()
