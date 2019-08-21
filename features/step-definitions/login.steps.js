import TabBar from '../../tests/screenobjects/components/tab.bar';
import LoginScreen from '../../tests/screenobjects/login.screen';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I am on the login screen', function () {
    TabBar.waitForTabBarShown(true);
    TabBar.openLogin();
    LoginScreen.waitForIsShown(true);
});

//
// WHEN
//
When('I submit my authentication details', function () {
    LoginScreen.loginContainerButon.click();
    LoginScreen.email.setValue('test@webdriver.io');
    LoginScreen.password.setValue('Test1234!');

    if (driver.isKeyboardShown()) {
        driver.hideKeyboard();
    };

    LoginScreen.loginButton.click();
});

//
// THEN
//
Then('I should be logged into the app', function () {
    LoginScreen.alert.waitForIsShown();
    expect(LoginScreen.alert.text()).equal('Success\nYou are logged in!');

    LoginScreen.alert.pressButton('OK');
    LoginScreen.alert.waitForIsShown(false);
});
