import WDIOReporter from '@wdio/reporter';
import TestRail from './test-rail';
import chalk from 'chalk';

var Status = {
    PASSED: 1,
    BLOCKED: 2,
    UNTESTED: 3,
    RETEST: 4,
    FAILED: 5
};

export default class Wdio5CucumberTestRailReporter extends WDIOReporter {
    constructor (options) {
        options = Object.assign(options, { stdout: true });
        super(options);

        this.unsynced = [];

        this._results = [];
        this._passes = 0;
        this._fails = 0;
        this._pending = 0;
        this._stepCount = 0;
        this._out = [];
        this.scenarioCount = 1;
        this.featureCount = 1;
        this.testRail = new TestRail(options);
        this._suiteResults = [];
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0;
    }

    onRunnerStart (runner) {
        // console.log('=== RunnerStart ===');
    }

    onBeforeCommand () {
        // console.log('=== BeforeCommand ===');
    }

    onAfterCommand () {
        // console.log('=== AfterCommand ===');
    }

    onScreenshot () {
        // console.log('=== Screenshot ===');
    }

    onSuiteStart (suite) {
        // console.log('=== SuiteStart ===');
        if (suite.type === 'scenario') {
            // Every time we start a new suite, reset the step counter and results
            this._stepCount = 1;
            this._suiteResults = [];

            if (this.options.logResults) {
            // Check to see if this scenario has a testrail tag - @TR(nnnnn)
                this.testRailTestCaseId = this.getTestrailIdFromTags(suite.tags);
                if (this.testRailTestCaseId !== null) {
                    console.log(`   ${chalk.cyan.underline('Scenario:')} ${suite.title} (${this.testRailTestCaseId})`);
                } else {
                    console.warn('This scenario does not have a Testrail tag so results will not be logged to testrail');
                // TODO: See if we can create a new testcase in testrail
                }
            } else {
                console.log(`   ${chalk.cyan.underline('Scenario:')} ${suite.title}`);
            }
        } else {
            console.log(`\n\n${chalk.yellow.underline('Feature:')} ${suite.title}`);
        }
    }

    onHookStart (hook) {
        // console.log('=== HookStart ===');
    }

    onHookEnd (hook) {
        // console.log('=== HookEnd ===');
    }

    onTestStart (test) {
        // console.log('=== TestStart ===');
    }

    onTestPass (test) {
        // console.log('=== TestPass ===');
        // TODO: We might be able to move all of this to onSuiteEnd and just parse the
        //       suite.tests stats
        this._passes++;
        this._out.push(test.title + ': pass');
        if (this.testRailTestCaseId !== null) {
            // save the passed step result
            const result = {
                step_num: this._stepCount++,
                status_id: Status.PASSED,
                comment: `${test.title}`
            };
            this._suiteResults.push(result);
            console.log(`${chalk.greenBright('      ✓ ')} ${test.title}`);
        }
    }

    onTestFail (test) {
        // console.log('=== TestFail ===');
        // TODO: We might be able to move all of this to onSuiteEnd and just parse the
        //       suite.tests stats
        this._fails++;
        this._out.push(test.title + ': fail');
        if (this.testRailTestCaseId !== null) {
            // save the failed step result
            const result = {
                step_num: this._stepCount++,
                status_id: Status.FAILED,
                comment: `${test.title}
                ${test.error.message}`
                // ${test.error.stack}`
            };
            this._suiteResults.push(result);
            console.log(`${chalk.redBright('      ✖ ')} ${test.title}`);
            console.log(`${chalk.redBright(test.error.message)}`);
        }
    }

    onTestSkip (test) {
        // console.log('=== TestSkip ===');
        // TODO: We might be able to move all of this to onSuiteEnd and just parse the
        //       suite.tests stats
        this._pending++;
        this._out.push(test.title + ': pending');
        console.log(`${chalk.cyanBright('      - ')} ${test.title}`);
    }

    onTestEnd () {
        // console.log('=== TestEnd ===');
    }

    onSuiteEnd (suite) {
        // console.log('=== SuiteEnd ===');
        if (suite.type === 'scenario') {
            if (this.testRailTestCaseId !== null) {
                // save the results for testrail logging
                this._results.push({
                    case_id: this.testRailTestCaseId,
                    results: this._suiteResults
                });
            }
        }
    }

    onRunnerEnd (data) {
        // console.log('=== RunnerEnd ===');
        if (this.options.logResults) {
            if (this._results.length === 0) {
                console.warn('No testcases were matched. Ensure that your tests are tagged with the @TR(nnnnnn) tag\n');
                return;
            }
            this.unsynced.push('wait');
            const executionDateTime = new Date().toLocaleString();
            const total = this._passes + this._fails + this._pending;
            const runName = this.options.runName || 'Test Run';
            const name = `${runName}: ${executionDateTime}`;
            const description = `Automated Test Execution on ${executionDateTime}`;
            this.testRail.publish(name, description, this._results, data.capabilities);
            this.unsynced.pop();
        }
    }

    getTestrailIdFromTags (testTags) {
        var testCaseIdRegExp = /\d+/g;
        for (var x = 0; x < testTags.length; x++) {
            if (testTags[x].name.includes('@TR(')) {
                var caseId = testTags[x].name.match(testCaseIdRegExp);
                return Number(caseId);
            }
        }
        return null;
    }
}
