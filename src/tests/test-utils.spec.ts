import { SuiteResult, TestResult } from '../lib/suite'

export const wait = (t: number): Promise<void> => new Promise(resolve => setTimeout(resolve, t))

export type ComparableTestResult = { name: string, error: string | null, skipped: boolean }
export type ComparableSuiteResult = { name: string, tests: Array<ComparableTestResult>, subSuites: Array<ComparableSuiteResult>, skipped: boolean }

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
    skipped: res.skipped,
    tests: res.tests.map(getComparableTestResult),
    subSuites: res.subSuites.map(getComparableSuiteResult)
  }
}
