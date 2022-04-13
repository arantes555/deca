import 'source-map-support/register'
import '../lib/bdd-global'
import './tests.spec'

const main = async () => {
  // TODO: remove ts-ignore
  // @ts-ignore
  const success = await global.runTests()
  if (success === false) if (global.process) global.process.exitCode = 1
}

main()
