exports.testrail = {
    domain: (process.env.TOGO_TESTRAIL_URL || 'thlonline.testrail.net'),
    username: (process.env.TOGO_TESTRAIL_USERNAME || 'togo-rv-qa@togogroup.io'),
    password: (process.env.TOGO_TESTRAIL_PASSWORD || 'testrail1234'),
    logResults: (JSON.parse(process.env.TOGO_TESTRAIL_LOG_RESULTS || 'false')),
    projectId: (Number(process.env.TOGO_TESTRAIL_PROJECT || '37')),
    runName: (process.env.TOGO_TESTRAIL_RUN_NAME || 'Test Run '),
    includeAll: (JSON.parse(process.env.TOGO_TESTRAIL_INCLUDEALL || 'false')),
    assignToId: (process.env.TOGO_TESTRAIL_ASSIGN),
    updateRunId: (process.env.TOGO_TESTRAIL_RUN),
    updatePlanId: (process.env.TOGO_TESTRAIL_PLAN),
};
