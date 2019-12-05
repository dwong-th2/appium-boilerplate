/* eslint-disable no-unused-expressions */
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
    ChecklistScreen.waitForChecklistToLoad();
});

When('I complete the task {string}', function (taskToSelect) {
    ChecklistScreen.selectChecklistItemByName(taskToSelect);
});

When('I delete the checklist {string}', function (checklistName) {
    ChecklistsListScreen.selectChecklistByName(checklistName);
    ChecklistScreen.waitForChecklistToLoad();

    expect(ChecklistScreen.deleteChecklist(), 'Was the checklist deleted?').to.be.true;
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

When('create a checklist named {string}', function (newChecklistName) {
    ChecklistsListScreen.createChecklist(newChecklistName);
    ChecklistScreen.waitForChecklistToLoad();
});

When('I finish editing the checklist', function () {
    ChecklistScreen.clickDoneButton();
});

When('return to the checklist list page', function () {
    for (var x = 0; x < 5; x++) {
        if (ChecklistsListScreen.isDisplayed()) {
            break;
        } else {
            ChecklistScreen.clickBackButton();
        }
    }
});

// THEN //
Then('the Checklists list displays', function () {
    expect(ChecklistsListScreen.waitForIsShown(), 'Are we on the checklists list screen?').to.be.true;
});

Then('the checklist screen displays', function () {
    ChecklistScreen.waitForChecklistToLoad();
    expect(ChecklistScreen.waitForIsShown(), 'Are we on the checklist screen?').to.be.true;
});

Then('the checklist {string} will be open in edit mode', function (checklistName) {
    expect(ChecklistScreen.isChecklistInEditMode(), 'Is the new checklist open in edit mode?').to.be.true;
});

Then('the checklist will be empty', function () {
    expect(ChecklistScreen.isChecklistEmpty(), 'Is the new checklist empty?').to.be.true;
});

Then('the checklist list page will contain the checklist {string}', function (checklistName) {
    expect(ChecklistsListScreen.isChecklistInList(checklistName), 'Is the checklist in the list?').to.be.true;
});

Then('the checklist list page will not contain the checklist {string}', function (checklistName) {
    expect(ChecklistsListScreen.isChecklistInList(checklistName), 'Is the checklist in the list?').to.be.false;
});
