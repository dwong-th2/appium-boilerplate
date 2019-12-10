/* eslint-disable no-unused-expressions */
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';
import SideMenu from '../../tests/screenobjects/abe-menu';
import ChecklistsListScreen from '../../tests/screenobjects/abe-checklists_list.screen';
import ChecklistScreen from '../../tests/screenobjects/abe-checklist.screen';

const { When } = require('cucumber');

// GIVEN //

// WHEN //
When('I complete all checklists in progress', function () {
    if (DashboardScreen.isAChecklistInProgress()) {
        SideMenu.openChecklists();
        var checklists = ChecklistsListScreen.getChecklistsInProgressList();
        checklists.forEach(function (item) {
            ChecklistsListScreen.selectChecklistByName(item);
            ChecklistScreen.waitForChecklistToLoad();
            ChecklistScreen.completeChecklist();

            // check if feedback panel popped up?
            if (ChecklistScreen.isFeedbackDisplayed()) {
                ChecklistScreen.closeFeedback();
            }
        });
    }
});

When('I delete all user created checklists', function () {
    SideMenu.openChecklists();
    var togoChecklists = ChecklistsListScreen.getTogoChecklists();
    var checklists = ChecklistsListScreen.getChecklistsList();
    checklists.forEach(function (item) {
        if (item !== '' && !togoChecklists.includes(item)) {
            ChecklistsListScreen.selectChecklistByName(item);
            ChecklistScreen.waitForChecklistToLoad();
            ChecklistScreen.deleteChecklist();
        }
    });
    // go back to the dashboard so the checklist list page can be reloaded
    ChecklistsListScreen.clickBackButton();
});
