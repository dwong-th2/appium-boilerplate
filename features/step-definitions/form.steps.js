import TabBar from '../../tests/screenobjects/components/tab.bar';
import FormScreen from '../../tests/screenobjects/forms.screen';
import Gestures from '../../tests/helpers/Gestures';
import LoginScreen from '../../tests/screenobjects/login.screen';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('I am on the forms tab', function () {
    TabBar.waitForTabBarShown(true);
    TabBar.openForms();
    FormScreen.waitForIsShown(true);
});

//
// When
//
When(/^I set the text input control to "(.*)"$/, function (inputText) {
    FormScreen.input.setValue(inputText);
});

When(/^I toggle the switch control "(on|off)"$/, function (switchState) {
    FormScreen.switch.click();
});

When('I click on the Inactive button', function () {
    Gestures.checkIfDisplayedWithScrollDown(FormScreen.inActiveButton, 2);
});

When('I click on the Active button', function () {
    Gestures.checkIfDisplayedWithScrollDown(FormScreen.activeButton, 2);
    FormScreen.activeButton.click();
});

When('I dismiss the system alert', function () {
    FormScreen.alert.pressButton('OK');
});

When(/^I select the dropdown picker item "(.*)"$/, function (itemTitle) {
    FormScreen.dropDown.click();
    FormScreen.picker.selectValue(itemTitle);
});

//
// THEN
//
Then(/^I shall be able to retrieve "(.*)" from the text input control$/, function (expectedText) {
    expect(FormScreen.inputTextResult.getText()).equal(expectedText);

    /**
     * IMPORTANT!!
     *  Because the app is not closed and opened between the tests
     *  (and thus is NOT starting with the keyboard hidden)
     *  the keyboard is closed here if it is still visible.
     */
    if (driver.isKeyboardShown()) {
        driver.hideKeyboard();
    }
});

Then(/^the switch is "(on|off)"$/, function (switchState) {
    if (switchState === 'on') {
        expect(FormScreen.isSwitchActive()).equal(true);
    }

    if (switchState === 'off') {
        expect(FormScreen.isSwitchActive()).equal(false);
    }
});

Then('the state of the Inactive button is inactive', function () {
    FormScreen.alert.waitForIsShown(false);
    FormScreen.inActiveButton.click();
    driver.pause(1000);
    FormScreen.alert.waitForIsShown(false);
});

Then('the system alert appears', function () {
    FormScreen.alert.waitForIsShown(true);
});

Then('the system alert contains the correct text', function () {
    expect(LoginScreen.alert.text()).equal('This button is\nThis button is active');
});

Then('the system alert is no longer displayed', function () {
    FormScreen.alert.waitForIsShown(false);
});

Then(/^the item has title text "(.*)"$/, function (itemTitle) {
    expect(FormScreen.getDropDownText()).contain(itemTitle);
});
