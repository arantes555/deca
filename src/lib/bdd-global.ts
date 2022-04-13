import * as bdd from './bdd'

// TODO: remove ts-ignores

// @ts-ignore
global.describe = bdd.describe
// @ts-ignore
global.it = bdd.it
global.before = bdd.before
global.after = bdd.after
global.beforeEach = bdd.beforeEach
global.afterEach = bdd.afterEach
// @ts-ignore
global.runTests = () => bdd.globalSuite.run()
