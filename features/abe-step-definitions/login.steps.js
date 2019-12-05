/* eslint-disable no-unused-expressions */
import LoginScreen from '../../tests/screenobjects/abe-login.screen';
import WelcomeScreen from '../../tests/screenobjects/abe-welcome.screen';
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen';
import AccountScreen from '../../tests/screenobjects/abe-account.screen';
import SideMenu from '../../tests/screenobjects/abe-menu';

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
// const testUserLogin = "michael.wong+test@th2.com";
// const testUserPassword = "123test123";
const testUserLogin = 'darrel.decker@th2.com';
const testUserPassword = 'togopass';

// GIVEN //
Given('I submit my Togo ID', function () {
    // wait for either the welcome screen or the dashboard to show up
    for (var x = 0; x < 30; x++) {
        if (DashboardScreen.isDisplayed()) {
            // logout if already logged in
            console.log('Already logged in!! Logging out ...');
            SideMenu.openAccount();
            AccountScreen.signout();
            break;
        } else {
            if (WelcomeScreen.isDisplayed()) {
                break;
            }
        }
        browser.pause(500);
    }
    WelcomeScreen.waitForIsShown();
    WelcomeScreen.signIn();
});

// GIVEN //
Given('Im logged in', function () {
    // wait for either the welcome screen or the dashboard to show up
    for (var x = 0; x < 30; x++) {
        if (WelcomeScreen.isDisplayed()) {
            console.log('Not logged in yet!! Logging in ...');
            WelcomeScreen.signIn();
            LoginScreen.waitForIsShown();
            LoginScreen.signin(testUserLogin, testUserPassword);
            break;
        } else {
            if (DashboardScreen.isDisplayed()) {
                console.log('Already logged in');
                break;
            }
        }

        browser.pause(1000);
    }
});

// WHEN //
When('I supply the automation user credentials', function () {
    LoginScreen.waitForIsShown();
    LoginScreen.signin(testUserLogin, testUserPassword);
});

When('I logout from the app', function () {
    SideMenu.openAccount();
    AccountScreen.signout();
});

// THEN //
Then('my default vehicle is {string}', function (expectedVehicleName) {
    const actualVehicleName = DashboardScreen.getVehicleName();
    expect(actualVehicleName).to.equal(expectedVehicleName);
});

Then('I am returned to the Welcome screen', function () {
    expect(WelcomeScreen.waitForIsShown(), 'Are we on the welcome screen?').to.be.true;
});
