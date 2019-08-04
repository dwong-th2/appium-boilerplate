import DynamicPage from '../../tests/pageobjects/dynamic.page';
const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

//
// GIVEN
//
Given('the dynamic page is opened', function () {
    DynamicPage.open();
});

Given('the dynamic loaded page does not exist', function () {
    expect(DynamicPage.loadedPage.isExisting()).equal(false);
});

//
// WHEN
//
When('I click the button on the dynamic page', function () {
    DynamicPage.btnStart.click();
    DynamicPage.loadedPage.waitForExist();
});

//
// THEN
//
Then('the dynamic loaded page does exist', function () {
    expect(DynamicPage.loadedPage.isExisting()).equal(true);
});
