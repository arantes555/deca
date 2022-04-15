import { SuiteResult, TestResult } from '../lib/suite'

export const wait = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t))

export type ComparableTestResult = { name: string, error: string | null, skipped: boolean }
export type ComparableSuiteResult = {
  name: string
  success: boolean
  skipped: boolean
  nPassing: number
  nFailed: number
  tests: Array<ComparableTestResult>
  subSuites: Array<ComparableSuiteResult>
}

export const getComparableTestResult = (res: TestResult): ComparableTestResult => {
  return {
    name: res.name,
    error: res.error ? res.error.toString() : null,
    skipped: res.skipped
  }
}
export const getComparableSuiteResult = (res: SuiteResult): ComparableSuiteResult => {
  return {
    name: res.name,
    success: res.success,
    skipped: res.skipped,
    nPassing: res.nPassing,
    nFailed: res.nFailed,
    tests: res.tests.map(getComparableTestResult),
    subSuites: res.subSuites.map(getComparableSuiteResult)
  }
}
