# Appium Automation

> **NOTE:**
> This automation project is based on the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) project and the [cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate) project. 
- **WebdriverIO:** `5.16.#`
- **Appium:** `1.15.0`
---

## Project Configuration
/config - contains wdio configuration files <br>
/features - contains cucumber feature and step definitions files <br>
/tests/helpers - common utilities from appium-boilerplate and custom utilities <br>
/tests/reporter - files for wdio custom reporters <br>
/tests/screenobjects - page object files for the Togo RV app screens <br>

---

## Running the tests:
> `yarn test.appium.ios`

> `yarn test.appium.android`

This will run all of the ***\*.feature*** files using a default device configuration.
|     |                                 |
| --- | ------------------------------- |
| iOS | iPhone 11 Pro Max with iOS 13.0 |
| Android | Pixel 2 with Android 8.1 |

<br>

You can override the default device configuration by using the `TOGO_TEST_DEVICE` and `TOGO_TEST_OS_VERSION` environment variables.
> `TOGO_TEST_DEVICE="iPhone 8 Plus" TOGO_TEST_OS_VERSION=12.2 yarn test.appium.ios`

> `TOGO_TEST_DEVICE="Nexus 4 API 25" TOGO_TEST_OS_VERSION=7.1.1 yarn test.appium.android`

<br>

You can also run a subset of tests using the `TOGO_TEST_TAGS` envirnment variable to specify the cucumber tags
> `TOGO_TEST_TAGS="@smoke and @regression" yarn test.appium.ios`

> `TOGO_TEST_TAGS="@wip" yarn test.appium.android`

---

## Testrail Integration
A custom reporter was created to integrate with cucumber and Testrail. It is based on [wdio-testrail-cucumber-reporter](https://gavin771.github.io/wdio-testrail-cucumber-reporter/index.html) but has been converted to work with wdio v5 and the way we use Testrail at TogoGroup. Currently the reporter only handles adding results to existing Testrail test cases.

### Basics:
- Create a test case in Testrail
  - Set the *Template* to `Test Case (text)`
  - Set the *Type* to `Automated`
  - Set the *Automation Type* to `Appium`
  - Set the *Steps* to the cucumber steps of the test
- Create or update a .feature file in the /features directory with a scenario using the same cucumber steps
  - Tag the scenario with the cucumber tag `@TR(nnnnnn)` where nnnnnn is the Testrail test case id  
- Run the test - Any tests that contain the @TR tag will have their results logged to testrail

### Advanced:
By default, a new test run will get created with each execution, but there are a few environment variables you can set to modify how tests get logged. The default values are set in the testrail.conf.js file.
|     |                                 |
| --- | ------------------------------- |
| `TOGO_TESTRAIL_LOG_RESULTS` | Toggels if results are logged to testrail or not |
| `TOGO_TESTRAIL_PROJECT` | The Testrail project ID; default is 37 for the Togo RV project |
| `TOGO_TESTRAIL_RUN_NAME` | This is the name of the test run when a new run gets created. The name will always include a timestamp for when it was created as well as the device it was run on. The default name is 'Test Run |
| `TOGO_TESTRAIL_INCLUDEALL` | This controls if a new test run will contain all of the Testrail test cases (manual and automated) or if it will only contain the automated test cases that get executed. The default is false |
| `TOGO_TESTRAIL_ASSIGN` | This controls who (account ID) the new test run will be assigned to. The default is null |
| `TOGO_TESTRAIL_RUN` | Set this to the ID of an existing test run if you want to update the results of an existing test run instead of creating a new test run. This is not set by default. Note: If the test run is a stand alone test run then any new automated tests not currently in the test run will be added. If the test run has been assigned to a test plan, only test cases that currently exist in the test run will have their results updated |
| `TOGO_TESTRAIL_PLAN` | Set this to the ID of an existing plan if you want a new test run to be added to the plan. This is not set by default, so all new test runs will be stand alone test runs |

### Future Support
- Log results after each scenario instead of after each feature (this may cause TR api 439)
- Ability to generate .feature files based on the steps of the Testrail test case
- Ability to create a new Testrail test case if the automated test does not have a @TR tag
- Ability to support projects with multiple suites. Currently only projects operating in single suite mode are supported
