import CheckboxPage from '../../tests/pageobjects/checkbox.page';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('the checkbox page is opened', function () {
    CheckboxPage.open();
    CheckboxPage.firstCheckbox.waitForDisplayed(3000);
});

//
// WHEN
//
When('I view the state of the checkboxes', function () {
    // A do nothing step really
});

When('I toggle the first checkbox', function () {
    CheckboxPage.firstCheckbox.click();
});

//
// THEN
//
Then(/^the first checkbox shall be "(disabled|enabled)"$/, function (toggledState) {
    switch (toggledState) {
    case 'disabled':
        expect(CheckboxPage.firstCheckbox.isSelected()).equal(false);
        break;
    case 'enabled':
        expect(CheckboxPage.firstCheckbox.isSelected()).equal(true);
        break;
    default:
        throw new Error('Unknown state on first checkbox: ' + toggledState);
    }
});

Then(/^the second checkbox shall be "(disabled|enabled)"$/, function (toggledState) {
    switch (toggledState) {
    case 'disabled':
        expect(CheckboxPage.lastCheckbox.isSelected()).equal(false);
        break;
    case 'enabled':
        expect(CheckboxPage.lastCheckbox.isSelected()).equal(true);
        break;
    default:
        throw new Error('Unknown state on second checkbox: ' + toggledState);
    }
});
