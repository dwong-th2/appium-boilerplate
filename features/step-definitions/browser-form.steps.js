import FormPage from '../../tests/pageobjects/form.page';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('the form page is opened', function () {
    FormPage.open();
});

//
// WHEN
//
When('I supply invalid credentials', function () {
    FormPage.username.setValue('foo');
    FormPage.password.setValue('bar');
    FormPage.submit();
    FormPage.flash.waitForDisplayed(3000);
});

When('I supply valid credentials', function () {
    FormPage.username.setValue('tomsmith');
    FormPage.password.setValue('SuperSecretPassword!');
    FormPage.submit();
    FormPage.flash.waitForDisplayed(3000);
});

//
// THEN
//
Then('I am denied access', function () {
    expect(FormPage.flash.getText()).contains('Your username is invalid!');
});

Then('I am granted access', function () {
    expect(FormPage.flash.getText()).contains('You logged into a secure area!');
});
