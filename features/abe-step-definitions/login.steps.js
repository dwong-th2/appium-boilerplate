import LoginScreen from '../../tests/screenobjects/abe-login.screen';
import WelcomeScreen from '../../tests/screenobjects/abe-welcome.screen';
import DashboardScreen from '../../tests/screenobjects/abe-dashboard.screen'
import AccountScreen from '../../tests/screenobjects/abe-account.screen'
import SideMenu from '../../tests/screenobjects/abe-menu'

const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const testUserLogin = "michael.wong+test@th2.com";
const testUserPassword = "123test123";

// GIVEN //
Given('I submit my Togo ID', function () {
    if(DashboardScreen.isDisplayed()){
        // logout if already logged in
        console.log('Already logged in!! Logging out ...');
        SideMenu.openAccount();
        AccountScreen.signout();
    }
    WelcomeScreen.waitForIsShown();
    WelcomeScreen.signIn();
});

// GIVEN //
Given('Im logged in', function () {
    // login if not loged in yet
    if(WelcomeScreen.isDisplayed()){
        console.log('Not logged in yet!! Logging in ...');
        WelcomeScreen.signIn();
        LoginScreen.waitForIsShown();
        LoginScreen.signin(testUserLogin, testUserPassword);
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
Then('I am taken to the dashboard', function () {
    expect(DashboardScreen.waitForIsShown(),"Are we on the dashboard screen?");
});

Then('my default vehicle is {string}', function (expectedVehicleName) {
    const actualVehicleName=DashboardScreen.getVehicleName();
    expect(actualVehicleName).to.equal(expectedVehicleName);
});

Then('I am returned to the Welcome screen', function () {
    expect(WelcomeScreen.waitForIsShown(),"Are we on the welcome screen?");
});
