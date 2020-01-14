/* eslint-disable no-unused-expressions */
import TabBar from '../../tests/screenobjects/abe-tabbar';
import ChecklistsListScreen from '../../tests/screenobjects/abe-checklists_list.screen';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //

When('I click the {string} tabbar button', function (tabbarButton) {
    switch (tabbarButton) {
    case 'Home':
        TabBar.openHome();
        break;
    case 'Explore':
        TabBar.openExplore();
        break;
    case 'Checklists':
        TabBar.openChecklists();

        // hack to get around the screen opening with a checklist in progress
        // from previous tests
        if (!ChecklistsListScreen.isDisplayed()) {
            TabBar.openChecklists();
        }
        break;
    case 'RV Living':
        TabBar.openRVLiving();
        break;
    case 'My RV':
        TabBar.openMyRV();
        break;
    default:
    }
});

Then('the tabbar is not visible', function () {
    expect(TabBar.isDisplayed(), 'Is the tabbar nav displayed').to.equal(false);
});
Then('the tabbar is visible', function () {
    expect(TabBar.isDisplayed(), 'Is the tabbar nav displayed').to.equal(true);
});
