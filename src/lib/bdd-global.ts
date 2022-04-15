import * as bdd from './bdd'
import type { SuiteResult } from './suite'

/* eslint-disable no-var */
declare global {
  var describe: typeof bdd.describe
  var it: typeof bdd.it
  var before: typeof bdd.before
  var after: typeof bdd.after
  var beforeEach: typeof bdd.beforeEach
  var afterEach: typeof bdd.afterEach
  var runTests: () => Promise<SuiteResult>
}
/* eslint-enable no-var */

global.describe = bdd.describe
global.it = bdd.it
global.before = bdd.before
global.after = bdd.after
global.beforeEach = bdd.beforeEach
global.afterEach = bdd.afterEach
global.runTests = () => bdd.getGlobalSuite().run()
