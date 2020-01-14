/* eslint-disable no-unused-expressions */
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';
import TabBar from '../../tests/screenobjects/abe-tabbar';

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //
Given('I am on the dashboard', function () {
    TabBar.waitForTabBarShown();
    TabBar.openHome();
    DashboardScreen.waitForIsShown();
    //DashboardScreen.waitForDashboardToFullyLoad();
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
Then('I am taken to the dashboard screen', function () {
    expect(DashboardScreen.waitForIsShown(), 'Are we on the dashboard screen?').to.be.true;
});

Then('I am returned to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(), 'Are we on the dashboard screen?').to.be.true;
});

Then('the dashboard shows checklist {string} as {string} complete', function (checklistName, expPctComplete) {
    DashboardScreen.waitForChecklistsToLoad();
    var actPctComplete = DashboardScreen.getChecklistPctComplete(checklistName);
    expect(actPctComplete).to.equal(expPctComplete);
});

Then('the dashboard does not show any checklists in progress', function () {
    DashboardScreen.waitForChecklistsToLoad();
    expect(DashboardScreen.isAChecklistInProgress()).to.be.false;
});
