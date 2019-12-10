const { join } = require('path');
const { config } = require('./wdio.shared.conf');

const deviceName = process.env.TOGO_TEST_DEVICE || 'iPhone 11 Pro Max';
const platformVersion = process.env.TOGO_TEST_OS_VERSION || '13.2';
const appName = process.env.TOGO_TEST_APP || join(process.cwd(), '/ios/build/abeApp/Build/Products/Debug-iphonesimulator/abeApp.app');
const testTags = process.env.TOGO_TEST_TAGS || '';

if (testTags !== '') {
    config.cucumberOpts.tagExpression = testTags;
}

// ============
// Specs
// ============
config.specs = [
    './features/abe-app/*.feature',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'iOS',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // This is `appium:` for all Appium Capabilities which can be found here
        // http://appium.io/docs/en/writing-running-appium/caps/
        'appium:deviceName': deviceName,
        'appium:platformVersion': platformVersion,
        'appium:orientation': 'PORTRAIT',
        // `automationName` will be mandatory, see
        // https://github.com/appium/appium/releases/tag/v1.13.0
        'appium:automationName': 'XCUITest',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/abeApp.zip'),
        // Use this path after merging with abe-app code so we can just build and test    
        //'appium:app': appName,
        // Read the reset strategies very well, they differ per platform, see
        // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        'appium:noReset': true,
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
