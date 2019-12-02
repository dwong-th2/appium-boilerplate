import ChecklistsListScreen from '../../tests/screenobjects/abe-checklists_list.screen';
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';
import ChecklistScreen from '../../tests/screenobjects/abe-checklist.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //
When('I start a checklist', function () {
    DashboardScreen.startChecklist();
});

When('I select the checklist {string}', function (checklistToSelect) {
    ChecklistsListScreen.selectChecklistByName(checklistToSelect);
});

When('I complete the task {string}', function (taskToSelect) {
    ChecklistScreen.selectChecklistItemByName(taskToSelect);
});

When('I tap the back button', function () {
    ChecklistScreen.clickBackButton();
});

When('I navigate back to the dashboard', function () {
    for (var x = 0; x < 5; x++) {
        if (!ChecklistScreen.isBackButtonDisplayed()) {
            break;
        } else {
            ChecklistScreen.clickBackButton();
        }
    }
});

When('complete the checklist', function () {
    ChecklistScreen.completeChecklist();

    // check if feedback panel popped up?
    if (ChecklistScreen.isFeedbackDisplayed()) {
        ChecklistScreen.closeFeedback();
    }
});

// THEN //
Then('the Checklists list displays', function () {
    expect(ChecklistsListScreen.waitForIsShown(), 'Are we on the checklists list screen?');
});

Then('the checklist screen displays', function () {
    ChecklistScreen.closeTutorial();
    expect(ChecklistScreen.waitForIsShown(), 'Are we on the checklist screen?');
});
