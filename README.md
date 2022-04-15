# Deca

A minimalistic JS test runner, inspired by mocha's interface

```
deca [spec..]

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
```
