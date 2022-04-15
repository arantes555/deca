#!/usr/bin/env node
import arg from 'arg'
import fs from 'fs/promises'
import path from 'path'
import * as bdd from './bdd'

const main = async () => {
  const args = arg({
    // Types
    '--help': Boolean,
    '--version': Boolean,
    '--require': [String],
    '--fail-zero': Boolean,
    '--timeout': Number,
    '--silent': Boolean,
    '--exit': Boolean,

    // Aliases
    '-h': '--help',
    '-v': '--version',
    '-r': '--require',
    '-t': '--timeout',
    '--timeouts': '--timeout',
    '-s': '--silent',
    '-e': '--exit'
  })

  if (args['--help']) {
    console.log(
      `deca [spec..]

Run tests with Deca

Rules & Behavior
  -b, --bail                 Abort ("bail") after first test failure   [boolean] // not implemented yet
      --delay                Delay initial execution of root suite     [boolean] // not implemented yet
      --dry-run              Report tests without executing them       [boolean] // not implemented yet
      --exit                 Force Deca to quit after tests complete   [boolean]
      --fail-zero            Fail test run if no test(s) encountered   [boolean]
      --forbid-only          Fail if exclusive test(s) encountered     [boolean] // not implemented yet
      --forbid-pending       Fail if pending test(s) encountered       [boolean] // not implemented yet
      --retries              Retry failed tests this many times         [number] // not implemented yet
  -t, --timeout, --timeouts  Specify test timeout threshold (in milliseconds)
                                                        [string] [default: 2000]

Reporting & Output
  -s, --silent                         Do not produce reporting output [boolean]

File Handling
  -r, --require            Require module              [array] [default: (none)]

Positional Arguments
  spec  One or more files to test                      [array] [default: (none)]

Other Options
  -h, --help             Show usage information & exit                 [boolean]
  -V, --version          Show version number & exit                    [boolean]

Deca Resources
  GitHub: https://github.com/arantes555/deca
`
    )
    return
  }
  if (args['--version']) {
    const packageJson = await fs.readFile(path.resolve(__dirname, '../../package.json'), { encoding: 'utf8' })
    const packageObj = JSON.parse(packageJson)
    console.log(`deca v${packageObj.version}`)
    return
  }

  // Going to run tests...
  const globalSuite = bdd.getGlobalSuite()

  // set options
  if (args['--silent']) globalSuite.silent = true
  if (args['--timeout']) globalSuite.timeout(args['--timeout'])

  // handle --require
  for (const toRequire of args['--require']) {
    require(toRequire)
  }

  // handle test files
  require('./bdd-global')
  for (const testFile of args._) {
    require(path.resolve(testFile))
  }

  // running...
  const result = await globalSuite.run()

  // log results
  console.log(`✅  ${result.nPassing} passing`)
  if (result.nFailed > 0) console.log(`❌  ${result.nFailed} failed`)

  // setting exitCode if necessary
  if (args['--fail-zero'] && result.nPassing === 0) process.exitCode = 1
  if (!result.success) process.exitCode = 1

  // force exit if necessary
  if (args['--exit']) process.exit(process.exitCode)
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
