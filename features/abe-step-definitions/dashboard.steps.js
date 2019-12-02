import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //
Given('I am on the dashboard', function () {
    DashboardScreen.waitForIsShown();
});

// WHEN //
When('I tap {string}', function (dashboardButton) {
    switch (dashboardButton) {
    case 'Start a checklist':
        DashboardScreen.startChecklist();
        break;
    default:
    }
});

When('I tap checklist {string}', function (checklistName) {
    DashboardScreen.selectChecklistByName(checklistName);
});

// THEN //
Then('I am taken to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(), 'Are we on the dashboard screen?');
});

Then('I am returned to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(), 'Are we on the dashboard screen?');
});

Then('the dashboard shows checklist {string} as {string} complete', function (checklistName, expPctComplete) {
    var actPctComplete = DashboardScreen.getChecklistPctComplete(checklistName);
    expect(actPctComplete).to.equal(expPctComplete);
});

Then('the dashboard does not show any checklists in progress', function () {
    DashboardScreen.waitForIsShown();
    expect(DashboardScreen.startChecklistButton.waitForExist());
});
