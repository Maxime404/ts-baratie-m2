/**
 * Dirty Hack to use Typescript Workers
 * see: https://wanago.io/2019/05/06/node-js-typescript-12-worker-threads/
 */
const path = require('path')

require('ts-node').register()
require(
  path.resolve(__dirname, 'kitchen.ts')
)