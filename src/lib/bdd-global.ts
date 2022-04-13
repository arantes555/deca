import * as bdd from './bdd'

// TODO: remove ts-ignores

// @ts-ignore
global.describe = bdd.describe
// @ts-ignore
global.it = bdd.it
// @ts-ignore
global.before = bdd.before
// @ts-ignore
global.after = bdd.after
// @ts-ignore
global.beforeEach = bdd.beforeEach
// @ts-ignore
global.afterEach = bdd.afterEach
// @ts-ignore
global.runTests = () => bdd.getGlobalSuite().run()
