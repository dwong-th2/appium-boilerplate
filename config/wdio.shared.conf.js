require('@babel/register');
const { testrail } = require('./testrail.conf');
const Wdio5CucumberTestRailReporter = require('../tests/reporter/wdio-5-testrail-cucumber-reporter').default;
var fs = require('fs');

exports.config = {
    // ====================
    // Runner and framework
    // Configuration
    // ====================
    runner: 'local',
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/abe-step-definitions/*.steps.js'], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        requireModule: ['@babel/register'], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tags: [], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: 'not @util',
        timeout: 180000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        keepAlive: false,
    },
    sync: true,
    logLevel: 'silent',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'http://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: ['spec',
        [Wdio5CucumberTestRailReporter, {
            logResults: testrail.logResults,
            domain: testrail.domain,
            username: testrail.username,
            password: testrail.password,
            projectId: testrail.projectId,
            runName: testrail.runName,
            includeAll: testrail.includeAll,
            assignedToId: testrail.assignToId,
            updateRun: testrail.updateRunId,
            updatePlan: testrail.updatePlanId,
        }]
    ],
    // ====================
    // Appium Configuration
    // ====================
    services: ['appium'],
    appium: {
        // For options see
        // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        args: {
            // For arguments see
            // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        },
        command: 'appium'
    },

    port: 4723,

    // ====================
    // Some hooks
    // ====================
    onPrepare: function (config, capabilities) {
        // console.log(' === onPrepare ===');
        // Delete the testrail runid save file if it exists
        fs.unlink('testrailRunId.txt', function (err) {
            if (err) console.log('Testrail runid save file does not exist');
            else console.log('Testrail runid save file deleted successfully');
        });
    },

    beforeSession: (config, capabilities, specs) => {
        require('@babel/register');
    },

    onComplete: function (exitCode, config, capabilities, results) {
        // console.log(' === onComplete ===');
        // Delete the testrail runid save file if it exists
        fs.unlink('testrailRunId.txt', function (err) {
            if (err) console.log('Testrail runid save file does not exist');
            else console.log('Testrail runid save file deleted successfully');
        });
    },

};
