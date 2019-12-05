const { join } = require('path');
const { config } = require('./wdio.shared.conf');

const deviceName = process.env.TOGO_TEST_DEVICE || 'Pixel_8.1';
const platformVersion = process.env.TOGO_TEST_OS_VERSION || '8.1';
const appName = process.env.TOGO_TEST_APP || join(process.cwd(), '/android/app/build/outputs/apk/debug/app-debug.apk');
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
        platformName: 'Android',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': deviceName,
        'appium:platformVersion': platformVersion,
        'appium:orientation': 'PORTRAIT',
        // `automationName` will be mandatory, see
        // https://github.com/appium/appium/releases/tag/v1.13.0
        'appium:automationName': 'UiAutomator2',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/app-debug.apk'),
        // Use this path after merging with abe-app code so we can just build and test    
        //'appium:app': appName,

        // Read the reset strategies very well, they differ per platform, see
        // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        'appium:noReset': true,
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
