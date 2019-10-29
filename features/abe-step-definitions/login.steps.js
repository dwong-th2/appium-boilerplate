import NativeAlert from '../../tests/helpers/NativeAlert';
import { platform } from 'os';
import LoginScreen from '../../tests/screenobjects/abe-login.screen';
import WelcomeScreen from '../../tests/screenobjects/abe-welcome.screen';
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen'
import AccountScreen from '../../tests/screenobjects/abe-account.screen'
import SideMenu from '../../tests/screenobjects/abe-menu'

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I submit my Togo ID', function () {
    WelcomeScreen.waitForIsShown();
    WelcomeScreen.signIn();
});

//
// WHEN
//
When('I supply the automation user credentials', function () {
        LoginScreen.waitForIsShown();
        LoginScreen.signin("michael.wong+test@th2.com", "123test123");
});

When('I logout from the app', function () {
        SideMenu.openAccount();
        AccountScreen.signout();
});

//
// THEN
//
Then('I am taken to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(),"Are we on the dashboard screen?");
});

Then('my default vehicle is {string}', function (expectedVehicleName) {
    const actualVehicleName=DashboardScreen.getVehicleName();
    expect(actualVehicleName).to.equal(expectedVehicleName);
});

Then('I am returned to the Welcome page', function () {
    expect(WelcomeScreen.waitForIsShown(),"Are we on the welcome screen?");
});
