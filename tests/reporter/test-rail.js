/* eslint-disable no-tabs */
/**
 * @exports TestRail
 * @requires sync-request
 */

const request = require('sync-request');
const fs = require('fs');

var Status = {
    PASSED: 1,
    BLOCKED: 2,
    UNTESTED: 3,
    RETEST: 4,
    FAILED: 5
};

/**
 * TestRail basic API wrapper
 */
class TestRail {
    /**
	 * @param {Object} options - wdio TestRail specifc configurations
	 * @param {string} options.domain - Domain for TestRail
	 * @param {number} options.projectId - Project identifier
	 * @param {number} [options.assignedToId] - User identifier
	 * @param {string} options.username - User email
	 * @param {string} options.password - User API key
	 * @param {Boolean} options.includeAll - Flag to inlcude all tests from a suite in a run
	 * @param {number} options.updateRun - The id of an existing test run that should be updated. If the existing run is already assigned to a plan,
     *                                       then only the @TR tagged tests that already exist in the test run can be logged to Testrail. Otherwise, if
     *                                       it's a standalone test run and the @TR tagged test does not yet exist in the run, it will be automatically
     *                                       added to the existing run so the result can be logged in Testrail.
	 * @param {number} options.updatePlan - Test plan identifier for a test plan to update
	 */
    constructor (options) {
        this._validate(options, 'domain');
        this._validate(options, 'username');
        this._validate(options, 'password');
        this._validate(options, 'projectId');
        this._validate(options, 'includeAll');

        // compute base url
        this.options = options;
        this.base = `https://${options.domain}/index.php`;
    }

    /**
	 * Verifies if required options exist in webdriverio config file
	 *
	 * @param {Object} options - wdio TestRail specifc configurations
	 * @param {string} options.domain - Domain for TestRail
	 * @param {number} options.projectId - Project identifier
	 * @param {Array.<number>} options.suiteId - List of suites identifiers
	 * @param {number} [options.assignedToId] - User identifier
	 * @param {string} options.username - User email
	 * @param {string} options.password - User API key
	 * @param {Boolean} options.includeAll - Flag to inlcude all tests from a suite in a run
	 * @param {number} [options.updateRun] - Test run identifier for test run to update
	 * @param {number} [options.updatePlan] - Test plan identifier for a test plan to update
	 * @param {string} name - Name of the property
	 * @private
	 */
    _validate (options, name) {
        if (options == null) {
            throw new Error('Missing testrail options in wdio.conf');
        }
        if (options[name] == null) {
            throw new Error(`Missing ${name} value. Please update testrail.conf`);
        }
    }

    /**
	 * Construct and returns an API path
	 *
	 * @param {string} path - The path for the API
	 * @return {string} Constructed URL path to TestRail API
	 * @private
	 */
    _url (path) {
        return `${this.base}?${path}`;
    }

    /**
	 * Makes a POST request on a TestRail API
	 *
	 * @param {string} api - API path
	 * @param {*} body - Body of request
	 * @param {callback} error - Callback to handle errors
	 * @return {*} Response object
	 * @private
	 */
    _post (api, body, error = undefined) {
        return this._request('POST', api, body, error);
    }

    /**
	 * Makes a GET request on a TestRail API
	 *
	 * @param {string} api - API path
	 * @param {callback} error - Callback to handle errors
	 * @return {*} Response object
	 * @private
	 */
    _get (api, error = undefined) {
        return this._request('GET', api, null, error);
    }

    /**
	 * Makes a request to the TestRail API
	 *
	 * @param {string} method - Type of request to make
	 * @param {string} api - API path
	 * @param {*} body  Body of request
	 * @param {callback} error
	 * @return {*} API response
	 * @private
	 */
    _request (method, api, body, error = undefined) {
        const options = {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${this.options.username}:${this.options.password}`).toString('base64'),
                'Content-Type': 'application/json'
            },
        };
        if (body) {
            options.json = body;
        }

        let result = request(method, this._url(`/api/v2/${api}`), options);
        result = JSON.parse(result.getBody('utf8'));
        // console.log(result);
        if (result.error) {
            console.log('Error: %s', JSON.stringify(result.body));
            if (error) {
                error(result.error);
            } else {
                throw new Error(result.error);
            }
        }
        return result;
    }

    /**
	 * Creates a new array of unique data from the data
	 * within 2 existing arrays
	 *
	 * @param {Array.<*>} currArr
	 * @param {Array.<*>} newArr
	 * @returns {array}
	 * @private
	 */
    _createUniqueArray (currArr, newArr) {
        return [...new Set([...newArr, ...currArr])];
    }

    /**
	 * Creates a new test plan
	 *
	 * @param {string} name - Plan name
	 * @param {string} desc - Plane description
	 * @param {Array.<Object>} testRuns - Test runs
	 * @returns {*} API response
	 */
    addPlan (name, description, testRuns) {
        return this._post(`add_plan/${this.options.projectId}`, {
            name: name,
            description: description,
            entries: testRuns
        });
    }

    /**
	 * Retrieves a test plan
	 *
	 * @param {number} planId - Plan identifier
	 * @returns {*} API response
	 */
    getPlan (planId) {
        return this._get(`get_plan/${this.options.updatePlan}`);
    }

    /**
	 * Retrieves a test run
	 *
	 * @param {number} runId - Run identifier
	 * @returns {*} API response
	 */
    getRun (runId) {
        return this._get(`get_run/${runId}`);
    }

    /**
	 * Adds a a new test run to a test plan
	 *
	 * @param {number} planId - Plan identifier
	 * @param {number} suiteId  - Suite identifier
	 * @param {string} name - Plan name
	 * @param {string} desc - Plan name
	 * @param {Array.<number>} caseIds - Test case identifiers
	 * @return {*} API response
	 */
    addTestPlanEntry (planId, suiteId, name, desc, caseIds) {
        return this._post(
            `add_plan_entry/${planId}`, {
                include_all: this.options.includeAll,
                suite_id: suiteId,
                name: name,
                description: desc,
                case_ids: caseIds
            });
    }

    /**
	 * Adds missing case ids to a test plan entry
	 *
	 * @param {number} planId - Plan identifier
	 * @param {number} entryId  - Entry identifier
	 * @param {number} runId  - Run identifier
	 * @param {Array.<number>} caseIds - Test case identifiers
	 * @return {*} API response
	 */
    updateTestPlanEntry (planId, entryId, runId, caseIds) {
        const currentCasesInRun = this.getTestsForRun(runId).map(c => c.case_id);
        return this._post(`update_plan_entry/${planId}/${entryId}`, {
            case_ids: this._createUniqueArray(currentCasesInRun, caseIds)
        });
    }

    /**
	 * Gets a suite
	 *
	 * @param {number} suiteId - Suite identifier
	 * @return {*} API response
	 */
    getSuite (suiteId) {
        return this._get(`get_suite/${suiteId}`);
    }

    /**
	 * Gets all the tests in a run
	 *
	 * @param {number} runId - Run identifier
	 * @return {*} API response
	 */
    getTestsForRun (runId) {
        return this._get(`get_tests/${runId}`);
    }

    /**
	 * Adds a test run
	 *
	 * @param {string} name - Test run name
	 * @param {string} description - Test run description
	 * @return {*} API response
	 */
    addRun (name, description, caseIds) {
        return this._post(`add_run/${this.options.projectId}`, {
            name: name,
            description: description,
            assignedto_id: this.options.assignedToId,
            include_all: this.options.includeAll,
            case_ids: caseIds
        });
    }

    /**
	 * Updates the description of an existing run
	 *
	 * @param {number} runId - Run identifier
	 * @param {string} description - Test run description
	 * @return {*} API response
	 */
    updateRun (runId, description) {
        return this._post(`update_run/${runId}`, {
            description: description
        });
    }

    /**
	 * Adds test cases to a test run
	 *
	 * @param {number} runId - Run identifier
	 * @param {Array.<Object>} cases - Test case data
	 * @return {*} API response
	 */
    addCasesToRun (runId, cases) {
        const currentCasesInRun = this.getTestsForRun(runId).map(c => c.case_id);
        this._post(`update_run/${runId}`, {
            case_ids: this._createUniqueArray(currentCasesInRun, cases)
        });
    }

    /**
	 * Get test cases that belong to a suite
	 *
	 * @param {*} projectId - Project identifier
	 * @param {*} suiteId - Suite identifier
	 * @return {*} API response
	 */
    getTestsForSuite (projectId, suiteId) {
        return this._get(`get_cases/${projectId}&suite_id=${suiteId}`);
    }

    /**
	 * Get suites that belong to a project
	 *
	 * @param {*} projectId - Project identifier
	 * @return {*} API response
	 */
    getSuitesForProject (projectId) {
        return this._get(`get_suites/${projectId}`);
    }

    /**
	 * Adds test results for a test cases
	 *
	 * @param {number} runId - Run identifier
	 * @param {Array.<Object>} results - Test case results
	 *
	 * @return {*} API response
	 */
    addResultsForCases (runId, results, runIsInPlan) {
        const currentCasesInRun = this.getTestsForRun(runId).map(c => c.case_id);

        var resultsToLog = [];
        if (results.length > 0) {
            // loop through the step results and log a single result for each testcase
            for (var x = 0; x < results.length; x++) {
                // for every testcase, build the results that will be logged
                var passedCount = 0;
                var failedCount = 0;
                var resultComment = '';
                for (var y = 0; y < results[x].results.length; y++) {
                    switch (results[x].results[y].status_id) {
                    case Status.PASSED:
                        passedCount++;
                        resultComment += '✔️ ' + results[x].results[y].comment + '\n';
                        break;
                    case Status.FAILED:
                        failedCount++;
                        resultComment += '✖️ ' + results[x].results[y].comment + '\n';
                        break;
                    default:
                        resultComment += '--- ' + results[x].results[y].comment + '\n';
                    }
                }
                var statusToLog;
                if (passedCount > 0) {
                    statusToLog = Status.PASSED;
                }
                if (failedCount > 0) {
                    statusToLog = Status.FAILED;
                }
                if (passedCount === 0 && failedCount === 0) {
                    statusToLog = Status.UNTESTED;
                }

                var okToPush = true;
                if (runIsInPlan && !currentCasesInRun.includes(results[x].case_id)) {
                    okToPush = false;
                    console.warn(`Testrun [${runId}] belongs to a plan, and the run does not include testcase [${results[x].case_id}]`);
                    console.warn(`Results for testcase [${results[x].case_id}] cannot be logged to Testrail`);
                }

                if (okToPush) {
                    resultsToLog.push(
                        {
                            case_id: results[x].case_id,
                            status_id: statusToLog,
                            comment: resultComment
                        }
                    );
                }
            }
            if (resultsToLog.length > 0) {
                return this._post(`add_results_for_cases/${runId}`, {
                    results: resultsToLog
                });
            }
            return null;
        }
    }

    /**
	 * Publishes results of execution of an automated test run
	 *
	 * @param {string} name - Test run/plan name
	 * @param {string} description
	 * @param {Array.<Object>} results
     * @param {Object} rundata
	 * @param {callback} callback
	 */
    publish (name, description, results, rundata, callback = undefined) {
        console.log('=== Publishing Results to TestRail ===');
        const body = null;
        let plan = null;
        var runIsInPlan = false;

        // Get a list of the @TR tagged testcases that were executed
        var casesRun = [];
        for (var x = 0; x < results.length; x++) {
            casesRun.push(results[x].case_id);
        }

        const suitesForProject = this.getSuitesForProject(this.options.projectId);
        if (suitesForProject.length !== 1) {
            console.warn('Only projects operating in single suite mode are supported');
            console.warn('Results will not be logged to Testrail');
        } else {
            const suiteId = suitesForProject[0].id;
            // Update an existing run
            if (this.options.updateRun) {
                // Check to see if existing run is part of a plan
                const run = this.getRun(this.options.updateRun);
                if (run.plan_id !== null) {
                    runIsInPlan = true;
                }
                const runId = run.id;

                if (!runIsInPlan) {
                    // add any missing test case ids from tagged tests that aren't already in the existing test run
                    // TODO: We could probably do the same thing for runs in a plan by calling updateTestPlanEntry()
                    this.addCasesToRun(runId, casesRun);
                }

                // // We could potentially append some stuff to the run description every time
                // // we're logging results for a new feature file
                // const run = this.getRun(newRunId);
                // const updateDesc = run.description + '\n' + description;
                // this.updateRun(newRunId, updateDesc);

                // update results to a run
                this.addResultsForCases(runId, results, runIsInPlan);
                console.log(`Results published to ${this.base}?/runs/view/${runId}`);
            } else {
                // Create a new test run
                const runName = `${name} - (${rundata.platformName} ${rundata.platformVersion} - ${rundata.deviceName})`;
                var newRun = null;
                var newRunId = null;
                var newPlanEntryId = null;
                if (this.options.updatePlan) {
                    plan = this.getPlan(this.options.updatePlan);
                    if (plan.project_id !== this.options.projectId) {
                        console.warn(`The specified plan id [${this.options.updatePlan}] is not in the specified project id [${this.options.projectId}]`);
                        console.warn('Results will not be logged to Testrail');
                    }
                }

                // In order to have a single run for multiple feature files, we need to save off the new
                // run id to a file and reuse it when the next runner starts up. If the run is being
                // created in a new plan then also save off the new plan entry id. The file is deleted
                // before the first runner starts and the last runner ends in the wdio onPrepare() and
                // onComplete() hooks.
                var fileRunId = this.readIdFromFile();
                if (fileRunId !== null) {
                    // An existing run is already in progress so reuse the id from the file
                    if (fileRunId.includes('|')) {
                        // saved id is for a plan
                        newRunId = fileRunId.split('|')[0];
                        newPlanEntryId = fileRunId.split('|')[1];
                        // console.log('updating run ' + newRunId + ' in plan ' + this.options.updatePlan);
                        this.updateTestPlanEntry(this.options.updatePlan, newPlanEntryId, newRunId, casesRun);
                    } else {
                        // saved id is for a standalone run
                        newRunId = fileRunId;
                        // console.log('updating run ' + newRunId);
                        this.addCasesToRun(newRunId, casesRun);
                    }

                    // // We could potentially append some stuff to the run description every time
                    // // we're logging results for a new feature file
                    // const run = this.getRun(newRunId);
                    // const updateDesc = run.description + '\n' + description;
                    // this.updateRun(newRunId, updateDesc);
                } else {
                    // This is the first feature file to run, so save off the runId so it can be
                    // reused for the next feature file
                    if (this.options.updatePlan) {
                        // We're creating a new run under an existing plan
                        // console.log('creating new run in plan ' + this.options.updatePlan);
                        newRun = this.addTestPlanEntry(this.options.updatePlan, suiteId, runName, description, casesRun);
                        newRunId = newRun.runs[0].id;
                        newPlanEntryId = newRun.id;
                        fileRunId = newRunId + '|' + newPlanEntryId;
                        this.writeIdToFile(fileRunId);
                        runIsInPlan = true;
                    } else {
                        // We're creating a new standalone run
                        // console.log('creating new run');
                        newRun = this.addRun(runName, description, casesRun);
                        newRunId = newRun.id;
                        this.writeIdToFile(newRunId);
                    }
                }

                this.addResultsForCases(newRunId, results, runIsInPlan);
                console.log(`Results published to ${this.base}?/runs/view/${newRunId}`);
            }
        }

        // execute callback if specified
        if (callback) {
            callback(body);
        }
    }

    /**
	 * Reads a saved runid from a file
	 *
	 * @return {String} The runId if it's a standalone run or the runId|entryId if it's a
     *                  run within a plan. Returns null if the file doesn't exist.
     *
     *  Notes: In order to have a single run for multiple feature files, we need to save off the new
     *         run id to a file and reuse it when the next runner starts up. If the run is being
     *         created in a new plan then also save off the new plan entry id
	 */
    readIdFromFile () {
        var fileRunId = null;
        try {
            // console.log('reading run id from file');
            fileRunId = fs.readFileSync('testrailRunId.txt', 'utf8');
            // console.log('successfully read run id from file: ' + fileRunId);
            return fileRunId;
        } catch {
            // console.log('the run id file doesn\'t exist');
            return null;
        }
    }

    /**
	 * Writes an existing runid to a file
     *
     * @param {string} id - The id to write to the file. If it's a standalone run then the id
     *                      should be the newly created runId. If it's a run within an existing
     *                      plan then the id should be the newly created runId, pipe delimited
     *                      with the newly created plan entryId .. 'runId|entryId'
     *
     *  Notes: In order to have a single run for multiple feature files, we need to save off the new
     *         run id to a file and reuse it when the next runner starts up. If the run is being
     *         created in a new plan then also save off the new plan entry id
	 */
    writeIdToFile (id) {
        try {
            // console.log('writing run id to file');
            fs.writeFileSync('testrailRunId.txt', id);
            // console.log('successfully saved run id to file: ' + id);
        } catch {
            console.error('error writing run id to file');
        }
    }
}

module.exports = TestRail;
