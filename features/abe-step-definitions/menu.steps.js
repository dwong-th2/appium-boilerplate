import NativeAlert from '../../tests/helpers/NativeAlert';
import LoginScreen from '../../tests/screenobjects/abe-login.screen';
import WelcomeScreen from '../../tests/screenobjects/abe-welcome.screen';
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen'
import AccountScreen from '../../tests/screenobjects/abe-account.screen'
import SideMenu from '../../tests/screenobjects/abe-menu'

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

// GIVEN //
Given('I am on the dashboard', function () {
  DashboardScreen.waitForIsShown();
});

// WHEN //
When('I open the menu', function () {
  SideMenu.openMenu();
});

When('I close the side menu', function () {
  SideMenu.closeMenu();
});

// THEN //
Then('the side menu displays', function () {
    expect(SideMenu.isMenuOpen(),"Is the menu open?");
});

Then('the vehicle name is {string}', function (expectedVehicleName) {
    const actualVehicleName=SideMenu.getTitleText();
    expect(actualVehicleName).to.equal(expectedVehicleName);
});

Then('I am returned to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(),"Are we on the dashboard screen?");
});
