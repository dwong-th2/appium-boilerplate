/* eslint-disable no-unused-expressions */
import SideMenu from '../../tests/screenobjects/abe-menu';

const { When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //

// WHEN //
When('I open the menu', function () {
    SideMenu.openMenu();
});

When('I close the side menu', function () {
    SideMenu.closeMenu();
});

When('I go to checklists', function () {
    SideMenu.openChecklists();
});

// THEN //
Then('the side menu displays', function () {
    expect(SideMenu.isMenuOpen(), 'Is the menu open?').to.be.true;
});

Then('the vehicle name is {string}', function (expectedVehicleName) {
    const actualVehicleName = SideMenu.getTitleText();
    expect(actualVehicleName).to.equal(expectedVehicleName);
});
